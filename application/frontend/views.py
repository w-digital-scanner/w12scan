# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Create your views here.
import ipaddress
import math
import time

from django.shortcuts import render
import json
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
from tld import get_fld

from application.api.models import properly
from application.utils.util import datetime_string_format, third_info, is_proper, k2e_search, smartDate, lstrsub
from config import ELASTICSEARCH_HOSTS, STATIC_TASKS
from pipeline.elastic import es_search_ip, count_app, count_country, count_name, count_port, total_data, total_bug, \
    es_search_ip_by_id, es, es_search_domain_by_ip, es_search_domain_by_url, get_bug_count
from datetime import datetime
from django.http import Http404

from pipeline.redis import redis_con


def index(request):
    page = request.GET.get("p", "1")
    q = request.GET.get("q", None)
    try:
        page = int(page)
    except:
        page = 1
    if page <= 0:
        page = 1

    es = Elasticsearch(ELASTICSEARCH_HOSTS)
    start_time = datetime.now()
    keywords = None
    if q is None:
        _search = {
            "from": (page - 1) * 20,
            "size": 20,
            "sort": {"published_from": {"order": "desc"}}
        }
    else:
        _search, keywords = k2e_search(q, page)
    s = Search(using=es, index='w12scan').from_dict(_search)
    count = s.execute().hits.total

    # 分页逻辑
    max_page = math.ceil(count / 20)
    if page <= 5:
        paginations = range(1, 10)
    elif page + 5 > max_page:
        paginations = range(max_page - 5, max_page + 5)
    else:
        paginations = range(page - 5, page + 5)
    temp_pagin = []
    for i in paginations:
        if i <= max_page:
            temp_pagin.append(i)
    paginations = temp_pagin

    pagination = {
        "max_page": str(max_page),
        "current": page,
        "pre": str(page - 1) if page - 1 > 0 else "1",
        "next": str(page + 1) if page + 1 <= max_page else str(max_page),
        "paginations": paginations,
        "keyword": ""
    }
    if q is not None:
        pagination["keyword"] = "&q=" + q
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
            # 资产关联
            d["proper"] = is_proper(d["target"], "ip")
        elif doc_type == "domains":
            d.update(hit.to_dict())
            d["target"] = d.get("title") or d.get("url")
            if d.get("ip"):
                ip = d.get("ip")
                ip_info = es_search_ip(ip, True)
                if ip_info:
                    d["location"] = ip_info.location
            d["proper"] = is_proper(d["url"], "domain")
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
                   "statistics": statistics, "keyword": keywords})


def dashboard(request):
    count_ips, count_domains = total_data()
    count_bugs = total_bug()
    total = {
        "ips": count_ips,
        "domains": count_domains,
        "bugs": count_bugs
    }
    # 资产相关
    data = properly.objects.order_by("-id").all()

    # 图表统计
    payload = {"size": 0,
               "aggs": {
                   "sales": {
                       "date_histogram": {
                           "field": "published_from",
                           "interval": STATIC_TASKS,
                           "format": "yyyy-MM-dd"
                       }
                   }
               }
               }
    s = Search(using=es, index='w12scan').from_dict(payload)
    res = s.execute().to_dict()
    try:
        charts = res["aggregations"]["sales"]["buckets"]
    except KeyError:
        charts = []
    data_chart = {
        "labels": [],
        "data": []
    }
    for item in charts:
        count = item["doc_count"]
        if count == 0:
            continue
        data_chart["labels"].append(item["key_as_string"])
        data_chart["data"].append(item["doc_count"])

    # Bar chart
    names = count_name(6)
    data_bar = {
        "labels": [],
        "data": []
    }
    for item in names:
        data_bar["labels"].append(item["key"])
        data_bar["data"].append(item["doc_count"])

    # node monitor
    nodenames = redis_con.keys("w12_node_*")
    nodes = []
    for nodename in nodenames:
        dd = redis_con.hgetall(nodename)
        tem_dict = {}
        tem_dict["nodename"] = lstrsub(nodename, "w12_node_")
        tem_dict["last_time"] = dd.get("last_time", 0)
        tem_dict["tasks"] = dd.get("tasks", "error")
        tem_dict["running"] = dd.get("running", "error")
        tem_dict["finished"] = dd.get("finished", "error")
        tem_dict["status"] = "Running"
        if time.time() - float(tem_dict["last_time"]) > 60 * 5:
            tem_dict["status"] = "Pending"
        tem_dict["time"] = smartDate(float(tem_dict["last_time"]))
        nodes.append(tem_dict)

    # bug[domain]漏洞图表展示
    dd = es.indices.get_mapping(index='w12scan', doc_type='domains')
    dd = dd["w12scan"]["mappings"]["domains"]["properties"]
    data_bugs = []
    if "bugs" in dd:
        bug_type = dd["bugs"]["properties"].keys()
        index = 0
        for bug_name in bug_type:
            index += 1
            count = get_bug_count('domains', bug_name)
            dd = {}
            _cls = ["primary", "info", "danger", "success", "warning"]
            dd["label"] = bug_name
            dd["count"] = count
            dd["cls"] = _cls[index % 5]
            data_bugs.append(dd)

    return render(request, "frontend/dashboard.html",
                  {"total": total, "zc_data": data, "data_chart": data_chart, "data_bar": data_bar, "nodes": nodes,
                   "data_bugs": data_bugs})


def detail(request, id):
    '''
    ip domain 详情
    :param request:
    :param id:
    :return:
    '''
    data = es_search_ip_by_id(id)
    if not data:
        raise Http404
    data = data[0]
    doc_type = data["_type"]
    data = data["_source"]
    data["published_from"] = datetime_string_format(data["published_from"])
    if doc_type == "ips":
        target = data["target"]
        data["proper"] = is_proper(target, "ip")
        # 关联出域名
        union_domains = es_search_domain_by_ip(target, True)
        # 历史ip
        historys = es_search_ip(target)
        for h in historys:
            h["published_from"] = datetime_string_format(h["published_from"])

        # 关联C段ip
        c_data = []
        temp_ips = target.split(".")
        if len(temp_ips) == 4:
            del temp_ips[-1]
            query_ip = '.'.join(temp_ips) + ".*"
            payload = {
                "query": {
                    "wildcard": {"target": query_ip}
                },
                "collapse": {
                    "field": "target"
                },
                "sort": {
                    "published_from": {"order": "desc"}
                },
                "from": 0,
                "size": 10000
            }

            s = Search(using=es, index='w12scan', doc_type='ips').from_dict(payload)
            res = s.execute()
            for hit in res:
                cid = hit.meta.id
                d = hit.to_dict()
                if d["target"] != target:
                    if isinstance(d["target"], list):
                        d["target"] = d["target"][0]
                    # C段ip的上的域名
                    sub_data = []
                    sub_domain = es_search_domain_by_ip(d["target"], True)
                    for sub in sub_domain:
                        dd = {}
                        dd.update(sub)
                        sub_data.append(dd)
                    extrainfo = ""
                    for k in d.get("infos", []):
                        extrainfo += "{0}/{1} ".format(k.get("port", ""), k.get("name", "unknown"))

                    c_data.append({"id": cid, "ip": d["target"], "data": sub_data, "extrainfo": extrainfo})

            # c_data 排序

            c_data.sort(key=lambda a: int(a.get("ip", 0).split(".")[3]))

        return render(request, "frontend/ip_detail.html",
                      {"data": data, "union": union_domains, "c_data": c_data, "third_infomation": third_info(target),
                       "historys": historys})
    elif doc_type == "domains":
        ip = data["ip"]
        target = data["url"]
        data["proper"] = is_proper(target, "domain")

        # 展现信息
        field = ["title", "status_code", "X-Powered-By", "Server"]
        uldata = []
        for f in field:
            if f in data:
                uldata.append((f, data[f]))
        hit = es_search_ip(ip, deduplicat=True)

        historys = es_search_domain_by_url(target)
        for h in historys:
            h["published_from"] = datetime_string_format(h["published_from"])

        # s = Search(using=es, index='w12scan', doc_type='ips').from_dict(payload)
        ip_data = {}
        if hit:
            ip_data["id"] = hit.meta.id
            ip_data["ip"] = list(hit.target)[0]

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
                , "collapse": {
                    "field": "url"
                },
                "sort": {
                    "published_from": {"order": "desc"}
                },
                "from": 0,
                "size": 10000
            }
            s = Search(using=es, index='w12scan', doc_type='domains').from_dict(payload)
            for hit in s:
                dd = {}
                dd.update(hit.to_dict())
                if isinstance(dd["url"], list):
                    dd["url"] = dd["url"][0]
                dd["id"] = hit.meta.id
                dd["published_from"] = datetime_string_format(dd["published_from"])
                sub_domain_data.append(dd)

        return render(request, "frontend/domain_detail.html",
                      {"data": data, "ip_data": ip_data, "sub_domain": sub_domain_data,
                       "third_infomation": third_info(ip), "historys": historys, "uldata": uldata})


def zc_detail(request, id):
    try:
        m = properly.objects.get(id=id)
    except:
        m = None
    if m is None:
        raise Http404
    # 处理域名资产
    show_data = {}
    domains = m.domains.splitlines()
    show_data['domains'] = domains

    payload = {"query": {
        "bool": {
            "should": [

            ]
        }
    }, "collapse": {
        "field": "url"
    },
        "sort": {
            "published_from": {"order": "desc"}
        },
        "from": 0,
        "size": 10000
    }
    temp_list = []
    for temp in domains:
        if "*" not in temp and not temp.startswith("http"):
            temp = "http*" + temp
        temp_list.append({
            "wildcard": {
                "url": temp
            }
        })
    payload["query"]["bool"]["should"] = temp_list
    domains_data = []
    apps = set()
    if temp_list:
        s = Search(using=es, index='w12scan', doc_type='domains').from_dict(payload)
        for hit in s:
            dd = {}
            dd.update(hit.to_dict())
            dd["id"] = hit.meta.id
            if isinstance(dd["url"], list):
                dd["url"] = dd["url"][0]
            if dd.get("app"):
                apps |= set(dd.get("app"))
            domains_data.append(dd)
    # 从域名中分离出ip加入到ip资产
    temp_ips = set()
    for domain in domains_data:
        ip = domain.get("ip")
        if ip:
            temp_ips.add(ip)
    # 处理IP资产
    ips = m.ips.splitlines()
    show_data["ips"] = ips
    temp_ips |= set(ips)
    temp_list = []
    for temp in temp_ips:
        _ip = temp
        if "*" in _ip:
            temp_list.append({
                "wildcard": {
                    "target": _ip
                }
            })
        elif "/" in _ip:
            try:
                net = ipaddress.ip_network(_ip)
            except Exception as e:
                print(e)
                net = None
            if net:
                for i in net:
                    if i not in temp_ips:
                        temp_list.append({
                            "term": {
                                "target": str(i)
                            }
                        })
        else:
            temp_list.append({
                "term": {
                    "target": _ip
                }
            })

    payload = {"query": {
        "bool": {
            "should": [

            ]
        }
    }, "collapse": {
        "field": "target"
    },
        "sort": {
            "published_from": {"order": "desc"}
        },
        "from": 0,
        "size": 10000
    }
    payload["query"]["bool"]["should"] = temp_list
    ips_data = []
    # ip service name statices
    statics_services = {}

    if temp_list:
        s = Search(using=es, index='w12scan', doc_type='ips').from_dict(payload)
        for hit in s:
            dd = {}
            dd.update(hit.to_dict())
            dd["id"] = hit.meta.id
            if isinstance(dd["target"], list):
                dd["target"] = dd["target"][0]
            ips_data.append(dd)
            # 统计
            if dd.get("infos"):
                for item in dd.get("infos"):
                    name = item.get("name", None)
                    if not name:
                        continue
                    if name not in statics_services:
                        statics_services[name] = 0
                    statics_services[name] += 1

    data_pie = {
        "labels": list(statics_services.keys()),
        "data": list(statics_services.values())
    }

    return render(request, "frontend/zc-detail.html",
                  {"model": m, "domains": domains_data, "show_data": show_data, "apps": apps, "ips": ips_data,
                   "data_pie": data_pie})


def faq(request):
    return render(request, "frontend/faq.html")
