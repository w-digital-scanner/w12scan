from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse

from application.user.utils import user_check, user_update
from application.user.models import UserInfo


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
    userinfo = request.session.get("userinfo").get("username")
    obj = UserInfo.objects.get(name=userinfo)
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password", None)
        email = request.POST.get("email")
        ret = user_update(userinfo, name=username, email=email, password=password)
        if ret is not True:
            return render(request, 'user/setting.html', {"userinfo": obj, "err": ret})

        if len(password) > 0:
            return redirect(reverse("logout"))
        else:
            request.session["userinfo"] = {"username": username}
            return redirect(reverse("setting"))

    return render(request, 'user/setting.html', {"userinfo": obj})
