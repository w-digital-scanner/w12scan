#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/1/28 6:14 PM
# @Author  : w8ay
# @File    : elastic.py
from datetime import datetime

from elasticsearch import Elasticsearch

from config import ELASTICSEARCH_HOSTS
from elasticsearch_dsl import Date, Integer, Keyword, Text, Document, InnerDoc, Nested, Search
from elasticsearch_dsl.connections import connections

connections.create_connection(hosts=ELASTICSEARCH_HOSTS)
es = Elasticsearch(ELASTICSEARCH_HOSTS)


class Location(InnerDoc):
    country_id = Keyword()
    country = Keyword()
    region = Keyword()


class Info(InnerDoc):
    extrainfo = Text()
    name = Keyword()
    prot = Integer()
    product = Text()
    version = Keyword()


class Ips(Document):
    location = Nested(Location)
    infos = Nested(Info)
    target = Keyword()
    published_from = Date()

    class Index:
        name = 'w12scan'
        settings = {
            "number_of_shards": 2,
        }

    class Meta:
        doc_type = 'ips'

    def save(self, **kwargs):
        if not self.published_from:
            self.published_from = datetime.now()
        return super().save(**kwargs)


class Domains(Document):
    status_code = Integer()
    title = Text()
    headers = Text()
    body = Text()
    Server = Text()
    ip = Keyword()
    url = Keyword()
    CMS = Keyword()
    published_from = Date()

    class Index:
        name = 'w12scan'
        settings = {
            "number_of_shards": 2,
        }

    class Meta:
        doc_type = 'domains'

    def save(self, **kwargs):
        if not self.published_from:
            self.published_from = datetime.now()
        return super().save(**kwargs)


def es_search_ip(ip):
    _q = {

        "query": {
            "match": {
                "target": ip
            }
        }

    }
    s = Search(using=es, index='w12scan', doc_type="ips").from_dict(_q)
    if s.count() > 0:
        return list(s)[0]
    return False


if __name__ == '__main__':
    Ips.init()
    Domains.init()
