#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/1/28 6:14 PM
# @Author  : w8ay
# @File    : elastic.py
import os
import sys
import time
from datetime import datetime

import requests
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Date, Integer, Keyword, Text, Document, InnerDoc, Nested, Search
from elasticsearch_dsl.connections import connections

try:
    import config
except ModuleNotFoundError:
    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
from config import ELASTICSEARCH_HOSTS, ELASTICSEARCH_AUTH

connections.create_connection(hosts=ELASTICSEARCH_HOSTS, http_auth=ELASTICSEARCH_AUTH)
es = Elasticsearch(ELASTICSEARCH_HOSTS, http_auth=ELASTICSEARCH_AUTH)


class Location(InnerDoc):
    country_id = Keyword()
    country = Keyword()
    region = Keyword()


class Info(InnerDoc):
    extrainfo = Text()
    name = Keyword()
    port = Integer()
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


def es_search_ip(ip, deduplicat=False):
    _q = {

        "query": {
            "match": {
                "target": ip
            }
        },
        "sort": {
            "published_from": {"order": "desc"}
        }

    }
    if deduplicat:
        _q["collapse"] = {
            "field": "target"
        }
    s = Search(using=es, index='w12scan', doc_type="ips").from_dict(_q)
    if s.count() > 0:
        if deduplicat:
            return list(s)[0]
        else:
            return list(s)
    return False


def es_search_ip_by_id(id):
    _q = {

        "query": {
            "match": {
                "_id": id
            }
        }

    }
    s = Search(using=es, index='w12scan').from_dict(_q)
    dd = s.execute().to_dict().get("hits")
    if dd:
        dd = dd.get("hits")
    else:
        return False
    return dd


def es_search_domain_by_url(target):
    payload = {
        "query": {
            "match": {
                "url": target
            }
        },
        "sort": {
            "published_from": {
                "order": "desc"
            }
        }
    }
    s = Search(using=es, index='w12scan', doc_type='domains').from_dict(payload)
    return list(s)


def es_search_domain_by_ip(ip, deduplicat=False):
    payload = {
        "query": {
            "match": {
                "ip": ip
            }
        }
    }
    if deduplicat:
        payload["collapse"] = {
            "field": "url"
        }
        payload["sort"] = {
            "published_from": {"order": "desc"}
        }
    s = Search(using=es, index='w12scan', doc_type='domains').from_dict(payload)
    res = s.execute()
    union_domains = []
    for hit in res:
        cid = hit.meta.id
        d = hit.to_dict()
        domain = d["url"]
        if isinstance(domain, list):
            domain = domain[0]
        title = d.get("title", "")
        union_domains.append({"id": cid, "url": domain, "title": title})
    return union_domains


def count_app():
    payload = {
        "size": 0,
        "aggs": {
            "genres": {
                "terms": {
                    "field": "app.keyword",
                    "size": 8
                }
            }
        }
    }
    s = Search(using=es, index='w12scan', doc_type="domains").from_dict(payload)
    res = s.execute().to_dict()
    try:
        r = res["aggregations"]["genres"]["buckets"]
    except KeyError:
        r = None
    return r


def count_country():
    payload = {"size": 0,
               "aggs": {
                   "location": {
                       "nested": {
                           "path": "location"
                       },
                       "aggs": {
                           "country": {
                               "terms": {
                                   "field": "location.country_id",
                                   "size": 8
                               }
                           }
                       }
                   }
               }
               }
    s = Search(using=es, index='w12scan', doc_type='ips').from_dict(payload)
    res = s.execute().to_dict()
    try:
        r = res["aggregations"]["location"]["country"]["buckets"]
    except KeyError:
        r = None
    return r


def count_name(size=10):
    payload = {"size": 0,
               "aggs": {
                   "infos": {
                       "nested": {
                           "path": "infos"
                       },
                       "aggs": {
                           "name": {
                               "terms": {
                                   "field": "infos.name",
                                   "size": size
                               }
                           }
                       }
                   }
               }
               }
    s = Search(using=es, index='w12scan', doc_type='ips').from_dict(payload)
    res = s.execute().to_dict()
    try:
        r = res["aggregations"]["infos"]["name"]["buckets"]
    except KeyError:
        r = None
    return r


def count_port(size=10):
    payload = {"size": 0,
               "aggs": {
                   "infos": {
                       "nested": {
                           "path": "infos"
                       },
                       "aggs": {
                           "port": {
                               "terms": {
                                   "field": "infos.port",
                                   "size": size
                               }
                           }
                       }
                   }
               }
               }
    s = Search(using=es, index='w12scan', doc_type='ips').from_dict(payload)
    res = s.execute().to_dict()
    try:
        r = res["aggregations"]["infos"]["port"]["buckets"]
    except KeyError:
        r = None
    return r


def total_data():
    ips = Search(using=es, index='w12scan', doc_type='ips')
    domains = Search(using=es, index='w12scan', doc_type='domains')
    return ips.count(), domains.count()


def total_bug():
    payload = {"query": {"exists": {"field": "bugs"}
                         }, "size": 0
               }
    s = Search(using=es, index='w12scan').from_dict(payload)
    res = s.execute().to_dict()
    return res["hits"]["total"]


def get_bug_count(doc_type, key):
    payload = {'query': {'bool': {'must': [{'exists': {'field': 'bugs.{0}'.format(key)}}]}}, 'from': 0, 'size': 20,
               'sort': {'published_from': {'order': 'desc'}}}
    s = Search(using=es, index='w12scan', doc_type=doc_type).from_dict(payload)
    res = s.count()

    return res


if __name__ == '__main__':
    while 1:
        try:
            r = requests.get("http://" + ELASTICSEARCH_HOSTS[0], auth=ELASTICSEARCH_AUTH)
            if r.status_code != 200:
                continue
        except:
            print("retrying...")
            time.sleep(2)
            continue
        try:
            Ips.init()
            Domains.init()
            break
        except:
            time.sleep(1)
            continue
