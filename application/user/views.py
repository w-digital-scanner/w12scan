from django.shortcuts import render, redirect

# Create your views here.
from application.user.utils import user_check


def login(request):
    info = {}
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
