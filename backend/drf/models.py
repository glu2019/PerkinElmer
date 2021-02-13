from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    
    product_id = models.IntegerField(null=True, blank=True)
    description = models.TextField(blank=True) 
    date_time = models.DateTimeField(null=True, blank=True) 
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    elevation = models.IntegerField(null=True, blank=True, default=0)
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.description