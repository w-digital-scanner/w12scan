[TOC]

## 基于Docker单机部署

```bash
git clone https://github.com/boy-hack/w12scan
cd w12scan
docker-compose up -d
```

## 基于Docker的分布式多机部署方案
w12scan依赖四种服务，web,client,redis,elasticsearch。redis在其中扮演着消息队列的角色，所有的任务分配都由redis分发，所以，redis需要部署到可以访问到的地方(最好外网)，其他服务web,client,elasticsearch内外网均可(web与elasticsearch能够互ping即可)。在多机部署中，你至少需要三台服务器，web和redis部署在一起，client与elasticsearch单独部署。为了部署方便，全部以docker部署为例，你需要做的是修改一些配置文件。

### 部署Elasticsearch
在一台机器上，执行如下指令
```bash
mkdir /data # elasticsearch 数据存储目录
git clone https://github.com/boy-hack/w12scan
cd w12scan/doc/distributed/elasticsearch
docker-compose up -d
```
将会启动elasticsearch服务，并开放9200端口。

### 部署Web与Redis
- 如果Elasticsearch需要验证，在`docker-compose.yml`的web中加入环境变量`ELASTICSEARCH_AUTH: user:pass`
- 默认会将redis部署到公网的6379端口上，并且设置密码为`hellow12scan`，在`doc/distributed/web/docker-compose.yml`中修改此密码
在一台机器上，执行如下指令
```bash
git clone https://github.com/boy-hack/w12scan
cd w12scan/doc/distributed/web
docker-compose up -d
```
### 部署Client
在启动client之前你需要做这些事
```bash
git clone https://github.com/boy-hack/w12scan
cd w12scan/doc/distributed/client
```
- 修改`docker-compose.yml`
    - 修改`WEB_INTERFACE`为对应WEB的ip与端口
    - 修改`REDIS_HOST`、`REDIS_PASSWORD`为对应redis地址与密码
    - 修改`NODE_NAME`为这个节点取个名字吧
- 启动！
```bash
docker-compose up -d
```