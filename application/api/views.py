from django.shortcuts import render
from django.views.generic.base import View
from django.http import response, JsonResponse, HttpRequest

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from config import AUTH_POST_KEY


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
        if request.GET.get("k", "") != AUTH_POST_KEY:
            return JsonResponse({"status": "400", "msg": "Permission verification failed"})
        data = request.body.decode()

        return JsonResponse({"post": "test"})


@method_decorator(csrf_exempt, name="dispatch")
class AddDomainActionView(View):

    def post(self, request: HttpRequest):
        if request.GET.get("k", "") != AUTH_POST_KEY:
            return JsonResponse({"status": "400", "msg": "Permission verification failed"})
        data = request.body.decode()

        return JsonResponse({"post": "test"})
