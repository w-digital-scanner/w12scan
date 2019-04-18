# Create your models here.
from django.db import models


# Create your models here.
class UserInfo(models.Model):
    name = models.CharField(max_length=128, unique=True)
    email = models.CharField(max_length=128)
    password = models.CharField(max_length=255)
    token = models.CharField(max_length=32, unique=True)
