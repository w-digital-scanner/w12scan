# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Create your views here.
import math

from django.shortcuts import render
import json
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search

from application.utils.util import datetime_string_format
from config import ELASTICSEARCH_HOSTS
from pipeline.elastic import Ips, es_search_ip, count_app, count_country, count_name, count_port, total_data, total_bug, \
    es_search_ip_by_id, es
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


def ipdetail(request, id):
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
        payload = {
            "query": {
                "match": {
                    "ip": target
                }
            }
        }
        s = Search(using=es, index='w12scan', doc_type='domains').from_dict(payload)
        res = s.execute()
        union_domains = []
        for hit in res:
            cid = hit.meta.id
            d = hit.to_dict()
            domain = d["url"]
            title = d.get("title", "")
            union_domains.append({"id": cid, "url": domain, "title": title})
        return render(request, "frontend/ip_detail.html", {"data": data, "union": union_domains})
    elif doc_type == "domains":
        print(data)

        return render(request, "frontend/domain.html", {"data": data})
