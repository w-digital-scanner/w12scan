from django.db import models


# Create your models here.
class properly(models.Model):
    name = models.CharField(max_length=128)
    descript = models.TextField()
    ips = models.TextField()
    domains = models.TextField()
    add_time = models.DateField(auto_now=True)


