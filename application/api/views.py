import ipaddress
import json

from django.http import JsonResponse, HttpRequest, QueryDict
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import View
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search as Search2

from application.api.models import properly
from application.user.models import UserInfo
from application.utils.util import format_convert, k2e_search, datetime_string_format
from config import AUTH_POST_KEY, ELASTICSEARCH_HOSTS
from pipeline.elastic import Ips, Domains
# Create your views here.
from pipeline.redis import redis_verify, redis_con


@method_decorator(csrf_exempt, name="dispatch")
class DemoListView(View):

    def get(self, request):
        return JsonResponse({"test": "11"})

    def post(self, request: HttpRequest):
        print(request.body)
        return JsonResponse({"post": "test"})


@method_decorator(csrf_exempt, name="dispatch")
class AddIpActionView(View):

    def post(self, request: HttpRequest):
        key = request.META.get("HTTP_W12SCAN", None)
        if key != AUTH_POST_KEY:
            return JsonResponse({"status": "400", "msg": "Permission verification failed"})
        data = request.body.decode()
        response = {}
        try:
            ip = json.loads(data)
            dd = Ips(**ip)
            dd.save()
            response["status"] = 200
            response["msg"] = "ok"
        except Exception as e:
            response["status"] = 400
            response["msg"] = str(e)

        return JsonResponse(response)


@method_decorator(csrf_exempt, name="dispatch")
class AddDomainActionView(View):

    def post(self, request: HttpRequest):
        key = request.META.get("HTTP_W12SCAN", None)
        if key != AUTH_POST_KEY:
            return JsonResponse({"status": "400", "msg": "Permission verification failed"})
        data = request.body.decode()
        response = {}
        try:
            ip = json.loads(data)
            dd = Domains(**ip)
            dd.save()
            response["status"] = 200
            response["msg"] = "ok"
        except Exception as e:
            response["status"] = 400
            response["msg"] = str(e)

        return JsonResponse(response)


@method_decorator(csrf_exempt, name="dispatch")
class Proper(View):

    # 获得信息
    def get(self, request):
        id = request.GET.get("id", "")
        try:
            m = properly.objects.get(id=id)
        except:
            m = None
        res = {}
        if m:
            data = {}
            data["desc"] = m.descript
            data["domains"] = m.domains
            data["ips"] = m.ips
            data["name"] = m.name
            data["id"] = m.id
            res["status"] = 200
            res["msg"] = data
        else:
            res["status"] = 400
            res["msg"] = "id don't exist"
        return JsonResponse(res)

    # 创建
    def post(self, request):
        name = request.POST.get("name")
        desc = request.POST.get("desc", "这家伙很懒，描述都不想写")
        ips = request.POST.get("ips")
        tem_ips = ips.splitlines()
        # check ip
        for temp in tem_ips:
            if "/" in temp:
                try:
                    net = ipaddress.ip_network(temp)
                except:
                    net = None
                if net is None:
                    res = {
                        "status": 400,
                        "msg": "CIDR格式错误 [{}]".format(temp)
                    }
                    return JsonResponse(res)

        domains = request.POST.get("domains")
        properly.objects.create(name=name, descript=desc, ips=ips, domains=domains)

        res = {
            "status": 200,
            "msg": "ok"
        }
        return JsonResponse(res)

    # 更新
    def put(self, request):
        data = QueryDict(request.body)
        id = data.get("id")
        name = data.get("name")
        desc = data.get("desc")
        ips = data.get("ips")

        tem_ips = ips.splitlines()
        # check ip
        for temp in tem_ips:
            if "/" in temp:
                try:
                    net = ipaddress.ip_network(temp)
                except:
                    net = None
                if net is None:
                    res = {
                        "status": 400,
                        "msg": "CIDR格式错误: [{0}]".format(temp)
                    }
                    return JsonResponse(res)

        domains = data.get("domains")
        m = properly.objects.get(id=id)
        m.name = name
        m.descript = desc
        m.ips = ips
        m.domains = domains
        m.save()
        res = {
            "status": 200,
            "msg": "ok"
        }
        return JsonResponse(res)

    # 删除
    def delete(self, request):
        id = request.GET.get("id", "")
        try:
            m = properly.objects.get(id=id)
        except:
            m = None
        res = {}
        if m:
            res["status"] = 200
            res["msg"] = "ok"
            m.delete()
        else:
            res["status"] = 400
            res["msg"] = "id don't exist"
        return JsonResponse(res)


@method_decorator(csrf_exempt, name='dispatch')
class Search(View):
    def get(self, request):
        q = request.GET.get("q", None)
        page = request.GET.get("page", "1")
        doc_type = request.GET.get("type", "all")  # all ips domains
        token = request.GET.get("token", "")
        try:
            obj = UserInfo.objects.get(token=token)
        except Exception as e:
            obj = False
        if not obj:
            return JsonResponse({"code": 404, "msg": "token is unavailable"})
        if doc_type == "all":
            doc_type = ''
        try:
            page = int(page)
        except:
            page = 1
        if page <= 0:
            page = 1

        es = Elasticsearch(ELASTICSEARCH_HOSTS)
        if q is None:
            _search = {
                "from": (page - 1) * 20,
                "size": 20,
                "sort": {"published_from": {"order": "desc"}}
            }
        else:
            _search, keywords = k2e_search(q, page)
        s = Search2(using=es, index='w12scan', doc_type=doc_type).from_dict(_search)
        count = s.execute().hits.total
        datas = []
        for hit in s:
            doc_type = hit.meta.doc_type
            id = hit.meta.id
            d = {}
            _temp = {}
            if doc_type == "ips":
                d = hit.to_dict()
                _temp = {
                    "doc_type": "ip",
                    "target": d["target"]
                }
            elif doc_type == "domains":
                d = hit.to_dict()
                _temp = {
                    "doc_type": "domain",
                    "target": d["url"]
                }

            _temp["id"] = id
            _temp["published_from"] = datetime_string_format(d["published_from"])
            datas.append(_temp)
        res = {
            "code": 200,
            "count": count,
            "datas": datas,
            "page": page
        }
        return JsonResponse(res)


@method_decorator(csrf_exempt, name="dispatch")
class Scan(View):

    # 获得信息
    def get(self, request):
        res = {}
        target = request.GET.get("t", None)
        res["status"] = 400
        res["msg"] = "Target has existed database.({})".format(target)
        if target:
            target = format_convert(target)
            b = redis_verify(target)
            if b:
                res["status"] = 200
                res["msg"] = "ok"
        return JsonResponse(res)

    def post(self, request):
        data = request.body.decode().splitlines()
        all = 0
        success = 0
        for temp in data:
            if not temp:
                continue
            all += 1
            target = format_convert(temp)
            b = redis_verify(target)
            if b:
                success += 1
        res = {
            "status": 200,
            "msg": "All:{0} Success:{1}".format(all, success)
        }
        return JsonResponse(res)


@method_decorator(csrf_exempt, name="dispatch")
class NodeListView(View):

    def get(self, request):
        res = {}
        target = request.GET.get("name", None)
        res["status"] = 400
        res["msg"] = "error"
        if target is None:
            return JsonResponse(res)
        nodenames = "w12_log_{0}".format(target)

        llen = redis_con.llen(nodenames)
        res["status"] = 200
        if not llen:
            res["msg"] = ""
            return JsonResponse(res)
        ret = ''
        for i in range(llen - 1, 0 - 1, -1):
            tem = redis_con.lindex(nodenames, i)
            ret += tem + "\n"
        res["msg"] = ret
        return JsonResponse(res)

    def delete(self, request):
        res = {
            "status": 200,
            "msg": "ok"
        }
        target = request.GET.get("name", None)
        if target is None:
            res["msg"] = "error"
            res["status"] = 200
            return JsonResponse(res)
        node1 = "w12_node_{}".format(target)
        node2 = "w12_log_{}".format(target)
        redis_con.delete(node1)
        redis_con.delete(node2)
        return JsonResponse(res)
