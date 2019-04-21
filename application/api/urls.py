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
        view=views.DemoListView.as_view(),
    ),
    url(
        regex=r'^domain$',
        view=views.AddDomainActionView.as_view(),
    ),
    url(
        regex=r'^ip$',
        view=views.AddIpActionView.as_view(),
    ),
    url(
        regex=r'^zichan$',
        view=views.Proper.as_view()
    ),
    url(
        regex=r'^scan$',
        view=views.Scan.as_view()
    ),
    url(
        regex=r'^node$',
        view=views.NodeListView.as_view()
    ),
    url(
        regex=r'^search$',
        view=views.Search.as_view()
    )

]
