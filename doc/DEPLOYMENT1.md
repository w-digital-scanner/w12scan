[TOC]



## 基于docker单机部署

```bash
git clone https://github.com/boy-hack/w12scan
cd w12scan
docker-compose up -d
```

## 使用Elasticsearch云服务与docker部署

适用于vps配置无法运行Elasticsearch的情况，

1. 配置Elasticsearch密码,修改`config.py`中`ELASTICSEARCH_AUTH = ('elastic','password')`更换为对应的用户名和密码。
2. 修改docker-compose.yml中web的`ELASTICSEARCH_HOSTS`为elasticsearch服务器对应地址    ![Tux, the Linux mascot](https://user-images.githubusercontent.com/19923974/54098563-1977bb80-43f0-11e9-8b34-b937d45b1db0.png)
3. `docker-compose up -d`启动！

## 基于docker的分布式部署

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

## Docker 多机部署方案
w12scan依赖四种服务，web,client,redis,elasticsearch。redis在其中扮演着消息队列的角色，所有的任务分配都由redis分发，所以，redis需要部署到可以访问到的地方(最好外网)，其他服务web,client,elasticsearch内外网均可(web与elasticsearch能够互ping即可)。

