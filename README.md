# w12scan
[Chinese](README-ZH.md)

W12scan is a network asset discovery engine that can automatically aggregates related assets for analysis and use. W12scan is also my graduation design. :)

Here is a web source program,but the scanning end is at [w12scan-client](https://github.com/boy-hack/w12scan-client)

[![w12scan](./doc/w12scan-preview.png)](https://x.hacking8.com/content/uploadfile/201902/w12scan-preview-3.mp4)

## Thinking
Based on python3 + django + elasticsearch + redis and use the web restful api to add scan targets.

![w12scan](doc/w12scan.jpg)

## Feature

### Web
* Powerful search syntax
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
    * Enter the target details. If the target is ip, all domain names on the ip and all domain names on the c class will be automatically associated. If the target is a domain name, the adjacent station, segment c and subdomain are automatically associated.
* Multi-node management
    * WEB will check the status of the node every few minutes, you can see the number of node scans and the node scan log.
* Task restful
    * Provides an interface to add tasks, you can add it on the WEB side or integrate it in any software.

### Scanning end
* Poc
    * Call the latest poc script online via [airbug](https://github.com/boy-hack/airbug)
* Built-in scan script
    * Common vulnerability verification service built into the scanner.
* Scanning
    * Use masscan，nmap，wappalyzer，w11scan
* Easy to distribute
    * This is taken into account in the design of the program architecture. It is very easy to distribute and run the scan terminal directly on another machine. It also can be distributed based on docker, celery service.

## Installation
Quickly build an environment with docker
```bash
git clone https://github.com/boy-hack/w12scan
cd w12scan
docker-compose up -d
```
Wait a while to visit `http://127.0.0.1:8000`
## Telegram Group
Telegram Group:https://t.me/joinchat/MZ16xBd1HRD2Nq_o1T8XIQ
### Some Issue
1. The elasticsearch memory usage capacity is 512M by default, please adjust dynamically according to the machine configuration.
2. For Windows, you need to pay attention to https://github.com/boy-hack/w12scan/issues/12 (thanks @Hotsunrize).  
3. Q:How to install distributed A:[Deployment](./doc/DEPLOYMENT1.md)
## Legal
This program is mainly used to collect network data for analysis and research. Please follow the relevant local laws before using this program.