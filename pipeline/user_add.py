#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/4/15 8:35 PM
# @Author  : w8ay
# @File    : user_add.py
import sys
import os

path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
sys.path.append(path)
from Server import settings

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Server.settings')
django.setup()
from application.user.utils import user_add
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

if __name__ == '__main__':
    if len(sys.argv) != 4:
        print("add_user \n usage: python user_admin.py username email password")
        exit()
    argv = sys.argv
    name = argv[1]
    email = argv[2]
    password = argv[3]
    try:
        validate_email(email)

    except ValidationError:
        print("email vaildtion error!")
        exit()

    ret = user_add(name, email, password)
    if ret is True:
        print("add user {} success".format(name))
    else:
        print("add user {} faild ".format(name) + ret)
