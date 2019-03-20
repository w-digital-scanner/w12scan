#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/1/28 3:22 PM
# @Author  : w8ay
# @File    : config.py
import os

RUNMODEL = os.environ.get("RUNMODEL") or 'dev'
# Client端与Server端通信的口令
AUTH_POST_KEY = "hello-w12scan!"

# Elasticsearch 服务器,测试用,实际部署依据环境变量传入
ELASTICSEARCH_HOSTS = ['127.0.0.1:9200']

# Elasticsearch 验证密码
ELASTICSEARCH_AUTH = None
# 带有密码时修改 ELASTICSEARCH_AUTH = ('elastic','password')

# Reids服务器
REDIS_HOST = '127.0.0.1:6379'

if RUNMODEL == "docker" or RUNMODEL == "pro":
    ELASTICSEARCH_HOSTS = [os.environ.get("ELASTICSEARCH_HOSTS")]
    REDIS_HOST = os.environ.get("REDIS_HOST")

# WEB 任务量统计按'day'、'mouth'、'year'
STATIC_TASKS = 'day'
