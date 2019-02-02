#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2019/1/29 3:33 PM
# @Author  : w8ay
# @File    : util.py
import re


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


if __name__ == '__main__':
    print(datetime_string_format("2019-01-29T13:30:56.625478"))
