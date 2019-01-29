#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/1/29 11:20 AM
# @Author  : w8ay
# @File    : into_elastic.py
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
from config import ELASTICSEARCH_HOSTS
from pipeline.elastic import Ips, Domains
import json
from datetime import datetime


def save_ip():
    filename = "/Users/boyhack/Desktop/ips.result.1.txt"
    with open(filename) as f:
        data = json.load(f)

    # ip = elastic.Ips()

    for ip_data in data:
        ip = Ips(**ip_data)
        ip.published_from = datetime.now()
        a = ip.save()
        print(a)


def save_domains():
    filename = "/Users/boyhack/Desktop/domain.result.txt"
    with open(filename) as f:
        data = json.load(f)

    # ip = elastic.Ips()

    for domain in data:
        dd = Domains(**domain)
        a = dd.save()
        print(a)


if __name__ == '__main__':
    es = Elasticsearch(ELASTICSEARCH_HOSTS)
    s = Search(using=es, index='w12scan', doc_type="ips").query("match", target="148.153.35.146")
    print(s.count())
    for hit in s:
        d = hit.to_dict()
        print(d)
