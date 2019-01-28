from django.db import models


# Create your models here.
class properly(models.Model):
    name = models.CharField(max_length=128)
    descript = models.TextField()
    ips = models.TextField()
    domains = models.TextField()
    pid = models.CharField(max_length=128)
    add_time = models.DateField(auto_now=True)


class ips(models.Model):
    ip = models.CharField(max_length=128)
    pid = models.CharField(max_length=128)
    add_time = models.DateField(auto_now_add=True)


class domains(models.Model):
    domain = models.CharField(max_length=128)
    pid = models.CharField(max_length=128)
    add_time = models.DateField(auto_now_add=True)
