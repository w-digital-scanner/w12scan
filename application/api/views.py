from django.views.generic.base import View
import json

from django.http import JsonResponse, HttpRequest
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import View

from config import AUTH_POST_KEY
from pipeline.elastic import Ips, Domains


# Create your views here.
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
        key = request.META.get("HTTP_AUTHORIZATION", None)
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
