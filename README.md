# w12scan
w12scan是一款网络资产搜索发现引擎，用于大规模搜索企业相关资产，也可当做小型Zoomeye使用。w12scan也是我的毕业设计，分为WEB端（用于展示显示数据）和Client端（用于搜索相关资产数据）。

这里是web端的开源程序，client端在[https://github.com/boy-hack/w12scan-client](https://github.com/boy-hack/w12scan-client)。

一个视频了解W12SCAN

## 想法简述
通过WEB交互接口，使用域名或IP的方式配置某公司相关网络资产，便可以搜集到该公司旗下相关资产。高级用法和Shadon和Zoomeye一样，通过elasticsearch复杂的查询语句你可以得到某个国家，某个地区，某种漏洞的爆发情况或某种组件(Server、CMS等等)的使用情况。

## 设计思想与想法
如果想更加了解程序中的设计和想法，可以看看我的毕业设计，虽然写的比较啰嗦，但大概思想都能体现。

## WEB Thinking
1. mysql和elasticsearch 用哪个
    - 首页
## WEB Todo 
- [ ] restful接口
- [ ] django elasticsearch的使用
- [ ] elasticsearch数据填充