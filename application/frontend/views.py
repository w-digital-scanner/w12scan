# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Create your views here.
from django.shortcuts import render


def index(request):
    return render(request, "frontend/recent.html", )


def dashboard(request):
    return render(request, "frontend/dashboard.html", )


def ipdetail(request):
    return render(request, "frontend/ipdetail.html")


def domain(request):
    return render(request, "frontend/domain.html")
