# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Create your views here.
import math

from django.shortcuts import render
import json
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
from tld import get_fld

from application.utils.util import datetime_string_format
from config import ELASTICSEARCH_HOSTS
from pipeline.elastic import Ips, es_search_ip, count_app, count_country, count_name, count_port, total_data, total_bug, \
    es_search_ip_by_id, es, es_search_domain_by_ip
from datetime import datetime
from django.http import Http404


def index(request):
    page = request.GET.get("p", "1")
    try:
        page = int(page)
    except:
        page = 1
    if page <= 0:
        page = 1

    es = Elasticsearch(ELASTICSEARCH_HOSTS)
    start_time = datetime.now()
    _search = {
        "from": (page - 1) * 20,
        "size": 20,
        "sort": {"published_from": {"order": "desc"}}
    }
    s = Search(using=es, index='w12scan').from_dict(_search)
    count = s.count()

    # 分页逻辑
    max_page = math.ceil(count / 20)
    if page <= 5:
        paginations = range(1, 6)
    elif page + 5 > max_page:
        paginations = range(max_page - 5, max_page)
    else:
        paginations = range(page - 2, page + 2)
    pagination = {
        "max_page": str(max_page),
        "current": page,
        "pre": str(page - 1) if page - 1 > 0 else "1",
        "next": str(page + 1) if page + 1 <= max_page else str(max_page),
        "paginations": paginations
    }
    # 分页完

    datas = []
    for hit in s:
        doc_type = hit.meta.doc_type
        id = hit.meta.id
        d = {}
        if doc_type == "ips":
            d.update(hit.to_dict())
            if d.get("infos"):
                d["info_tags"] = []
                for info in d["infos"]:
                    d["info_tags"].append("{}/{}".format(info["port"], info.get("name", "unknown")))
                d["infos"] = json.dumps(d["infos"], indent=2)
        elif doc_type == "domains":
            d.update(hit.to_dict())
            d["target"] = d.get("title") or d.get("url")
            if d.get("ip"):
                ip = d.get("ip")
                ip_info = es_search_ip(ip)
                if ip_info:
                    d["location"] = ip_info.location

        d["doc_type"] = doc_type
        d["id"] = id
        d["published_from"] = datetime_string_format(d["published_from"])
        datas.append(d)

    # 左侧统计代码逻辑
    statistics = {}
    # 1.组件统计
    apps = count_app()
    countrys = count_country()
    names = count_name()
    ports = count_port()
    statistics["apps"] = apps
    statistics["countrys"] = countrys
    statistics["names"] = names
    statistics["ports"] = ports

    # 总耗时间
    end_time = (datetime.now() - start_time).total_seconds()

    return render(request, "frontend/recent.html",
                  {"datas": datas, "count": count, "second": end_time, "pagination": pagination,
                   "statistics": statistics})


def dashboard(request):
    count_ips, count_domains = total_data()
    count_bugs = total_bug()
    total = {
        "ips": count_ips,
        "domains": count_domains,
        "bugs": count_bugs
    }
    return render(request, "frontend/dashboard.html", {"total": total})


def detail(request, id):
    data = es_search_ip_by_id(id)
    if not data:
        raise Http404
    data = data[0]
    doc_type = data["_type"]
    data = data["_source"]
    data["published_from"] = datetime_string_format(data["published_from"])
    if doc_type == "ips":
        target = data["target"]
        # 关联出域名
        union_domains = es_search_domain_by_ip(target)

        # 关联C段ip
        c_data = []
        temp_ips = target.split(".")
        if len(temp_ips) == 4:
            del temp_ips[-1]
            query_ip = '.'.join(temp_ips) + ".*"
            payload = {"query": {
                "wildcard": {"target": query_ip}
            }
            }
            s = Search(using=es, index='w12scan', doc_type='ips').from_dict(payload)
            res = s.execute()
            for hit in res:
                cid = hit.meta.id
                d = hit.to_dict()
                if d["target"] != target:
                    # C段ip的上的域名
                    sub_data = []
                    sub_domain = es_search_domain_by_ip(d["target"])
                    for sub in sub_domain:
                        dd = {}
                        dd.update(sub)
                        sub_data.append(dd)
                    c_data.append({"id": cid, "ip": d["target"], "data": sub_data})

        return render(request, "frontend/ip_detail.html", {"data": data, "union": union_domains, "c_data": c_data})
    elif doc_type == "domains":
        ip = data["ip"]
        target = data["url"]
        payload = {
            "query": {
                "match": {
                    "target": ip
                }
            }
        }
        s = Search(using=es, index='w12scan', doc_type='ips').from_dict(payload)
        ip_data = []
        for hit in s:
            ip_data.append({"id": hit.meta.id, "ip": hit.to_dict()["target"]})

        # subdomain 获取
        try:
            sub_domain = get_fld(target, fix_protocol=True)
        except:
            sub_domain = None
        sub_domain_data = []
        if sub_domain:
            payload = {"query": {
                "wildcard": {"url": "*." + sub_domain}
            }
            }
            s = Search(using=es, index='w12scan', doc_type='domains').from_dict(payload)
            for hit in s:
                dd = {}
                dd.update(hit.to_dict())
                dd["id"] = hit.meta.id
                dd["published_from"] = datetime_string_format(dd["published_from"])
                sub_domain_data.append(dd)

        return render(request, "frontend/domain_detail.html",
                      {"data": data, "ip_data": ip_data, "sub_domain": sub_domain_data})
