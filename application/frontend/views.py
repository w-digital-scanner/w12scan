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
from pipeline.elastic import Ips, es_search_ip
from datetime import datetime


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
    end_time = (datetime.now() - start_time).total_seconds()
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
        if doc_type == "ips":
            d = hit.to_dict()
            if d.get("infos"):
                d["info_tags"] = []
                for info in d["infos"]:
                    d["info_tags"].append("{}/{}".format(info["port"], info.get("name", "unknown")))
                d["infos"] = json.dumps(d["infos"], indent=2)
            d["published_from"] = datetime_string_format(d["published_from"])
            d["doc_type"] = doc_type
        elif doc_type == "domains":
            d = hit.to_dict()
            d["doc_type"] = doc_type
            d["published_from"] = datetime_string_format(d["published_from"])
            d["target"] = d.get("title") or d.get("url")
            if d.get("ip"):
                ip = d.get("ip")
                ip_info = es_search_ip(ip)
                d["location"] = ip_info.location
        datas.append(d)

    return render(request, "frontend/recent.html",
                  {"datas": datas, "count": count, "second": end_time, "pagination": pagination})


def dashboard(request):
    return render(request, "frontend/dashboard.html", )


def ipdetail(request):
    return render(request, "frontend/ipdetail.html")


def domain(request):
    return render(request, "frontend/domain.html")
