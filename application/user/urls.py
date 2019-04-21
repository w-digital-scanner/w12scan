#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/4/18 4:06 PM
# @Author  : w8ay
# @File    : urls.py.py
from . import views
from django.conf.urls import url

urlpatterns = [
    url(
        regex=r'login$',
        view=views.login,
        name='login'
    ),
    url(
        regex=r'logout$',
        view=views.logout,
        name='logout'
    ),
    url(
        regex=r'setting$',
        view=views.setting,
        name='setting'
    )
]
