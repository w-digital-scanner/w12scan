#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/1/29 3:33 PM
# @Author  : w8ay
# @File    : util.py
import re


def datetime_string_format(datetime):
    '''
    2019-01-29T13:30:56.625478 => 2019-01-29 13:30:56
    :param datetime:
    :return:
    '''
    res = re.match("(\d+-\d+-\d+)\S(\d+:\d+:\d+)", datetime)
    if res:
        return res.group(1) + " " +res.group(2)
    else:
        return ""


if __name__ == '__main__':
    print(datetime_string_format("2019-01-29T13:30:56.625478"))
