#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/1/29 9:26 PM
# @Author  : w8ay
# @File    : app_icon.py
from django import template
from Server.settings import WAPP_ICON

register = template.Library()


@register.filter
def app_icon(product):
    if product in WAPP_ICON:
        icon = WAPP_ICON[product]["icon"]

        path = "https://www.wappalyzer.com/images/icons/" + icon
        return '''<img src="{}" class="img-ss" alt="{}" title="{}">'''.format(path, product, product)

    html = '''<span class="badge badge-diy badge-pill">{}</span>'''.format(product)
    return html
