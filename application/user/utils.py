#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/4/15 7:47 PM
# @Author  : w8ay
# @File    : userinfo.py
from django.contrib.auth.hashers import make_password, check_password
from application.user.models import UserInfo
from application.utils.util import random_str
import hashlib


def user_check(name, password):
    try:
        user = UserInfo.objects.get(name=name)
    except:
        return False
    if not user:
        return False
    return check_password(password + user.token, user.password)


def user_add(name, email, password):
    salt = random_str(10)
    md5 = hashlib.md5()
    md5.update(make_password(name + salt, salt).encode())
    token = md5.hexdigest()
    password = make_password(password + token)
    try:
        UserInfo.objects.create(name=name, email=email, password=password, token=token)
    except Exception as e:
        return str(e)
    return True


def user_update(origin, name, email, password=None):
    try:
        obj = UserInfo.objects.get(name=origin)
    except Exception as e:
        return str(e)
    obj.name = name
    obj.email = email
    if password:
        password = make_password(password + obj.token)
        obj.password = password
    try:
        obj.save()
    except Exception as e:
        return str(e)
    return True
