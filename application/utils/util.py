#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/1/29 3:33 PM
# @Author  : w8ay
# @File    : util.py
import ipaddress
import json
import re

from application.api.models import properly


def datetime_string_format(datetime):
    '''
    2019-01-29T13:30:56.625478 => 2019-01-29 13:30:56
    :param datetime:
    :return:
    '''
    res = re.match("(\d+-\d+-\d+)\S(\d+:\d+:\d+)", datetime)
    if res:
        return res.group(1) + " " + res.group(2)
    else:
        return ""


def third_info(ip):
    dd = '''<div class="new-accounts">
            <ul class="chats">
                <li class="chat-persons">
                    <a target="_blank" href="{link_cert}">
                    <span class="pro-pic"><img src="{img_cert}" alt="profile image"></span>
                        <div class="user">
                            <p class="u-name">Certdb</p>
                            <p class="u-designation">SSL certificates search engine</p>
                        </div>
                    </a>
                </li>
                <li class="chat-persons">
                    <a href="{link_threat}" target="_blank">
                    <span class="pro-pic"><img src="{img_threat}" alt="profile image"></span>
                        <div class="user">
                            <p class="u-name">ThreatBook</p>
                            <p class="u-designation">微步在线威胁情报社区</p>
                        </div>
                    </a>
                </li>
                <li class="chat-persons">
                    <a href="{link_findsubdomain}" target="_blank">
                    <span class="pro-pic"><img src="{img_findsubdomain}" alt="profile image"></span>
                        <div class="user">
                            <p class="u-name">FindsubDomains</p>
                            <p class="u-designation">Find subdomains for security assessment penetration test.</p>
                        </div>
                    </a>
                </li>
                <li class="chat-persons">
                    <a href="{link_dnsdumper}" target="_blank">
                    <span class="pro-pic"><img src="{img_dnsdumper}" alt="profile image"></span>
                        <div class="user">
                            <p class="u-name">DNSdumpster</p>
                            <p class="u-designation">dns recon and research, find and lookup dns records</p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>'''
    items = {
        "threakbook": {
            "src": "https://x.threatbook.cn/nodev4/domain/" + ip,
            "img": "https://x.threatbook.cn/nodev4/img/favicon.ico@2c7a1cdc"
        },
        "certdb": {
            "src": "https://certdb.com/search?q=" + ip,
            "img": "https://certdb.com/ficon/apple-touch-icon.png"
        },
        "findsubdomains": {
            "src": "https://findsubdomains.com/subdomains-of/" + ip,
            "img": "https://findsubdomains.com/ficon/apple-touch-icon.png"
        },
        "dnsdumper": {
            "src": "https://dnsdumpster.com/",
            "img": "https://dnsdumpster.com/static/favicon.ico"
        }
    }
    return dd.format(img_cert=items["certdb"]["img"], img_threat=items["threakbook"]["img"],
                     img_findsubdomain=items["findsubdomains"]["img"], img_dnsdumper=items["dnsdumper"]["img"],
                     link_cert=items["certdb"]["src"], link_threat=items["threakbook"]["src"],
                     link_findsubdomain=items["findsubdomains"]["src"], link_dnsdumper=items["dnsdumper"]["src"])


def is_proper(arg, arg_type='ip'):
    m = properly.objects.all()
    for tem in m:
        name = tem.name
        id = tem.id
        ips = tem.ips
        ips = ips.splitlines()

        domains = tem.domains
        domains = domains.splitlines()

        if arg_type == "ip":
            for _ip in ips:
                if "*" in _ip:
                    tmp_ip = _ip.replace("*", "")
                    if tmp_ip in arg:
                        return name, id
                elif "/" in _ip:
                    try:
                        net = ipaddress.ip_network(_ip)

                    except:
                        net = None

                    if ipaddress.ip_address(arg) in net:
                        return name, id
                else:
                    if arg in _ip:
                        return name, id

        elif arg_type == "domain":
            for _d in domains:
                if "*" in _d:
                    tmp_d = _d.replace("*", "")
                    if tmp_d in arg:
                        return name, id
                else:
                    if _d in arg:
                        return name, id
    return None


def k2e_search(keyword, page=1):
    '''
    通过解析关键词转换为elasticsearch的搜索语法
    :param keyword:
    :return:

    title=“abc” 从标题中搜索
    header=“abc” 从http头搜索
    body=“” 从body搜索
    url = “*.baidu.com” 搜索baidu.com的子域名
    ip = ‘1.1.1.1’ 搜索ip
    port = ‘搜索端口’
    app = ’nginx’ 搜索组件
    country = ‘cn’ 搜索国家
    service = ‘mysql’ 搜索服务
    '''

    # 转义
    keyword = keyword.replace("\\'", "{zwf_yin}", )
    keyword = keyword.replace("\\\"", "{zwf_shuang}")

    feild = {
        "title": "title",
        "header": "headers",
        "body": "body",
        "url": "url",
        "ip": ["target", "ip"],
        "port": "infos.port",
        "app": "app.keyword",
        "country": "location.country_id",
        "service": "infos.name"
    }
    special_feild = {
        ""
    }

    # 解析keyword
    parren = '''(({thumil})\s*=\s*["'](.*?)['"])'''.format(thumil='|'.join(feild.keys()))
    m = re.findall(parren, keyword.strip())
    if not m:
        payload = {"query": {
            "bool": {
                "must": [

                ]
            }
        },
            "from": (page - 1) * 20,
            "size": 20,
            "sort": {"published_from": {"order": "desc"}}
        }
        return payload
    must_list = []
    for item in m:
        key = item[1]
        value = item[2]

        value = value.replace("{zwf_yin}", "'")
        value = value.replace("{zwf_shuang}", '"')

        if isinstance(feild[key], list):
            keys = feild[key]
            for i in keys:
                must_list.append({
                    "match": {
                        i: value
                    }
                })
        elif isinstance(feild[key], str):
            if key == "country":
                _payload = {"nested": {
                    "path": "location",
                    "query": {
                        "match": {
                            "location.country_id": value.upper()
                        }
                    }
                }
                }
                must_list.append(_payload)
            elif key == "port" or key == "service":
                _payload = {"nested": {
                    "path": "infos",
                    "query": {
                        "match": {
                            feild[key]: value
                        }
                    }
                }
                }
                must_list.append(_payload)
            elif key == "url":
                must_list.append({
                    "wildcard": {
                        "url": value
                    }
                })
            else:
                must_list.append({
                    "match": {
                        feild[key]: value
                    }
                })

    payload = {"query": {
        "bool": {
            "must": [

            ]
        }
    },
        "from": (page - 1) * 20,
        "size": 20,
        "sort": {"published_from": {"order": "desc"}}
    }
    payload["query"]["bool"]["must"] = must_list
    # print(json.dumps(payload))
    return payload


if __name__ == '__main__':
    import re

    text = r'''title="abc" && ip = '1.1.1.1' '''
    # s = search(text)
    # print(s)
