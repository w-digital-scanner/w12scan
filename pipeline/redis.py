#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/2/7 3:44 PM
# @Author  : w8ay
# @File    : redis.py
import redis  # 导入redis模块，通过python操作redis 也可以直接在redis主机的服务端操作缓存数据库

from config import REDIS_HOST

host, port = REDIS_HOST.split(":")
pool = redis.ConnectionPool(host=host, port=port,
                            decode_responses=True)  # host是redis主机，需要redis服务端和客户端都起着 redis默认端口是6379
redis_con = redis.Redis(connection_pool=pool)


def redis_verify(arg):
    '''
    arg 不在redis中，则添加到redis，设置缓存时间一个月，加入w12scan_scanned列表
    arg 在redis中，丢弃。
    :param arg:
    :return:
    '''
    ex_time = 60 * 60 * 24 * 30
    res = redis_con.set(name=arg, value='', ex=ex_time, nx=True)
    if res:
        redis_con.lpush("w12scan_scanned", arg)
        return True
    return False
