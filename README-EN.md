# w12scan

W12scan is a network asset discovery engine that can automatically aggregate related assets for analysis and use. W12scan is also my graduation design. :)

Here is a web source program and the scanning end is at [w12scan-client](https://github.com/boy-hack/w12scan-client).

[![w12scan](./doc/w12scan-preview.png)](https://x.hacking8.com/content/uploadfile/201902/w12scan-preview-3.mp4)

## Thinking
Based on python3 + django + elasticsearch + redis.

![w12scan](doc/w12scan.jpg)

## Feature

### Web
* Search syntax
    * Search for cms, service, titles, country regions, etc., to quickly find relevant targets.
        - title=“abc” # Search from the title
        - header=“abc” # Search from http header
        - body=“123” # Search from body text
        - url = “*.baidu.com” # Search for subdomains of baidu.com
        - ip = ‘1.1.1.1’ # Search from IP,support `'192.168.1.0/24'` and `'192.168.1.*'`
        - port = ‘80’ # Search form port 
        - app = ’nginx’ # Search application
        - country = ‘cn’ # Search from country
        - service = ‘mysql’ # Search from service
        - bug = 'xx' # Search from Vulnerability
* Custom assert
    * By customizing a company-related domain name or ip asset, w12scan will automatically help you find the corresponding asset target. When you browse the target, there is a prominent logo to remind you of the target's ownership.
* Automatic association
    * Enter the target details. If the target is ip, all domain names on the ip and the c class will be automatically associated. If the target is a domain name, the adjacent station, segment c and subdomain are automatically associated.
* Multi-node management
    * WEB will check the status of the node every few minutes and you can see the number of node scans and the node scan log.
* Task restful
    * W12Scan provides an interface to add tasks and you can add it on the WEB side or integrate it in any software.

### Scanning end
* Poc
    * Call the latest poc script online via [airbug](https://github.com/boy-hack/airbug).
* Built-in scan script
    * Common vulnerability verification service built into the scanner.
* Scanning
    * Use masscan，nmap，wappalyzer，w11scan.
* Easy to distribute
    * This is taken into account in the design of the program architecture. It is very easy to distribute and run the scan terminal directly on another machine. It also can be distributed based on docker, celery service.

## Installation
Quickly build an environment with docker
```bash
git clone https://github.com/boy-hack/w12scan
cd w12scan
docker-compose up -d
```
Wait a moment to visit `http://127.0.0.1:8000`.
Default account `boyhack:boyhack`.

### Some Issues
1. For Windows, you need to pay attention to https://github.com/boy-hack/w12scan/issues/12 (thanks @Hotsunrize).  
2. Q:How to install distributed A:[Deployment](./doc/DEPLOYMENT1.md)

### Links
- [设计论文](./doc/网络资产发现引擎的设计.docx)
- [如何构建一个网络空间搜索引擎-W12Scan-WEB篇](https://x.hacking8.com/post-340.html)
- [如何在本机搭建W12Scan](https://x.hacking8.com/post-342.html)

## Legal
This program is mainly used to collect network data for analysis and research. Please follow the relevant local laws before using this program.
