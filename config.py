#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/1/28 3:22 PM
# @Author  : w8ay
# @File    : config.py

# Client端与Server端通信的口令
AUTH_POST_KEY = "hello-w12scan!"

# Elasticsearch 集群
ELASTICSEARCH_HOSTS = ['127.0.0.1:9200']

# Reids服务器
REDIS_HOST = '127.0.0.1:6379'

# WEB 任务量统计按'day'、'mouth'、'year'
STATIC_TASKS = 'day'
