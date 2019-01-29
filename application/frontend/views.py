# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Create your views here.
from django.shortcuts import render
import json
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search

from application.utils.util import datetime_string_format
from config import ELASTICSEARCH_HOSTS
from pipeline.elastic import Ips, es_search_ip


def index(request):
    es = Elasticsearch(ELASTICSEARCH_HOSTS)
    s = Search(using=es, index='w12scan').sort({"published_from": {"order": "desc"}})[:200]
    datas = []
    for hit in s:
        doc_type = hit.meta.doc_type
        if doc_type == "ips":
            d = hit.to_dict()
            if d.get("infos"):
                d["info_tags"] = []
                for info in d["infos"]:
                    d["info_tags"].append("{}/{}".format(info["port"], info["name"]))
                d["infos"] = json.dumps(d["infos"], indent=2)
            d["published_from"] = datetime_string_format(d["published_from"])
            d["doc_type"] = doc_type
        elif doc_type == "domains":
            d = hit.to_dict()
            d["infos"] = json.dumps(d, indent=2, ensure_ascii=False)
            d["doc_type"] = doc_type
            d["published_from"] = datetime_string_format(d["published_from"])
            d["target"] = d.get("title") or d.get("url")
            if d.get("ip"):
                ip = d.get("ip")
                ip_info = es_search_ip(ip)
                print(ip_info)
        datas.append(d)

    return render(request, "frontend/recent.html", {"datas": datas})


def dashboard(request):
    return render(request, "frontend/dashboard.html", )


def ipdetail(request):
    return render(request, "frontend/ipdetail.html")


def domain(request):
    return render(request, "frontend/domain.html")
