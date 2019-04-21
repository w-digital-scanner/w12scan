#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/1/28 3:22 PM
# @Author  : w8ay
# @File    : config.py
import os

W12SCAN_VERSION = '0.2'

# Client端与Server端通信的口令
AUTH_POST_KEY = "hello-w12scan!"

# Elasticsearch 服务器,测试用,实际部署依据环境变量传入
ELASTICSEARCH_HOSTS = [os.environ.get("ELASTICSEARCH_HOSTS", default='127.0.0.1:9200')]

# Elasticsearch 验证密码
ELASTICSEARCH_AUTH = os.environ.get("ELASTICSEARCH_AUTH", default=None)
if ELASTICSEARCH_AUTH:
    user, passwd = ELASTICSEARCH_AUTH.split(":")
    ELASTICSEARCH_AUTH = (user, passwd)

# Reids服务器
REDIS_HOST = os.environ.get("REDIS_HOST", default='127.0.0.1:6379')
REDIS_PASSWORD = os.environ.get("REDIS_PASSWORD", default='')

# WEB 任务量统计按'day'、'mouth'、'year'
STATIC_TASKS = 'day'
