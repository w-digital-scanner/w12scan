[TOC]

## 基于docker单机部署

```bash
git clone https://github.com/boy-hack/w12scan
cd w12scan
docker-compose up -d
```

## 基于Docker的分布式部署

需要增加`docker-compose.yml`的client节点，例如

```dockerfile
version: '3'
services:

  web:
    build: .
    ports:
     - "8000:8000"
    environment:
      RUNMODEL: docker
      ELASTICSEARCH_HOSTS: elasticsearch:9200
      REDIS_HOST: redis:6379
    depends_on:
      - redis
      - elasticsearch
  client:
    image: boyhack/w12scan-client:latest
    environment:
      RUNMODEL: docker
      WEB_INTERFACE: http://web:8000
      REDIS_HOST: redis:6379
      NODE_NAME: "w12scan_w8ay"
    depends_on:
      - web
  client2:
    image: boyhack/w12scan-client:latest
    environment:
      RUNMODEL: docker
      WEB_INTERFACE: http://web:8000
      REDIS_HOST: redis:6379
      NODE_NAME: "w12scan_w8ay2"
    depends_on:
      - web
  client3:
    image: boyhack/w12scan-client:latest
    environment:
      RUNMODEL: docker
      WEB_INTERFACE: http://web:8000
      REDIS_HOST: redis:6379
      NODE_NAME: "w12scan_w8ay3"
    depends_on:
      - web
  redis:
    image: redis:5.0.3-stretch
    restart: always
    expose:
      - "6379"
  elasticsearch:
    image: elasticsearch:5.6-alpine
    ports:
      - "9200:9200"
    restart: always
    expose:
      - "9200"

```

便启动了三台节点。

## 基于Docker的多机部署方案
w12scan依赖四种服务，web,client,redis,elasticsearch。redis在其中扮演着消息队列的角色，所有的任务分配都由redis分发，所以，redis需要部署到可以访问到的地方(最好外网)，其他服务web,client,elasticsearch内外网均可(web与elasticsearch能够互ping即可)。在多机部署中，你至少需要三台服务器，web和redis部署在一起，client与elasticsearch单独部署。为了部署方便，全部以docker部署为例，你需要做的是修改一些配置文件。


