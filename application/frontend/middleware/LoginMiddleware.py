#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/4/15 8:10 PM
# @Author  : w8ay
# @File    : LoginMiddleware.py
from django.shortcuts import redirect

from django.urls import reverse


class LoginMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):

        urllist = [reverse('login')]

        if request.path not in urllist and not request.path.startswith("/api/v1"):
            if request.session.get('userinfo', None) is None:
                return redirect(reverse('login'))

        response = self.get_response(request)
        return response
