from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse

from application.user.utils import user_check


def login(request):
    info = {}
    # print(reverse('api:'))
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        if username and password:
            if user_check(username, password):
                request.session["userinfo"] = {'username': username}
                return redirect('/')
            else:
                info["msg"] = True
    return render(request, "frontend/login.html", info)


def logout(request):
    request.session.clear()
    return redirect('/')


def setting(request):
    return render(request, 'user/setting.html')
