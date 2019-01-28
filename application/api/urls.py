#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/1/28 2:29 PM
# @Author  : w8ay
# @File    : urls.py
from . import views
from django.conf.urls import url


urlpatterns = [
    url(
        regex=r'^test$',
        view=views.ApiListView.as_view(),
    ),
]