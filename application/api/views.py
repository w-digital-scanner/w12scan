from django.shortcuts import render
from django.views.generic.base import View
from django.http import response, JsonResponse, HttpRequest

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


# Create your views here.
@method_decorator(csrf_exempt, name="dispatch")
class ApiListView(View):

    def get(self, request):
        return JsonResponse({"test": "11"})

    def post(self, request: HttpRequest):
        print(request.body)
        return JsonResponse({"post": "test"})
