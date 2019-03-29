#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/3/29 5:35 PM
# @Author  : w8ay
# @File    : versiontag.py
from django import template

from config import W12SCAN_VERSION

register = template.Library()


@register.simple_tag
def w12_version():
    return W12SCAN_VERSION
