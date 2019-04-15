#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/4/15 8:35 PM
# @Author  : w8ay
# @File    : user_add.py
from application.utils.userinfo import user_add

if __name__ == '__main__':
    name = "admin"
    email = "admin@admin.com"
    password = "admin"
    ret = user_add(name, email, password)
    if ret is True:
        print("add user success")
    else:
        print("add user faild " + ret)
