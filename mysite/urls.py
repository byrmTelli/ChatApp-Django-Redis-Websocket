# mysite/urls.py
from django.contrib import admin
from django.urls import include, path
from chat import views as cviews

urlpatterns = [
    path("chat/", include("chat.urls")),
    path("admin/", admin.site.urls),
    path("login/",cviews.login,name="login"),
]