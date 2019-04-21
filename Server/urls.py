"""Server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from application.frontend import views as frontend

urlpatterns = [
    # url(r'^admin/', admin.site.urls),
    url(r'^$', frontend.index, name='recent'),
    url(r'^home/', frontend.dashboard, name='dashboard'),
    url(r'^detail/(.+)/$', frontend.detail, name='detail'),
    url(r'^zc-detail/(\d+)/$', frontend.zc_detail, name='zc-detail'),
    url(r'^faq/', frontend.faq, name='faq'),
    url(r'^user/', include("application.user.urls")),
    url(r'^api/v1/', include("application.api.urls")),
    # url(r'^login/', frontend.login, name='login')
]
