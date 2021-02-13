from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.conf import settings  
from drf import models   

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Product
        fields = ('id', 'product_id', 'description', 'date_time', 'lat', 'lng', 'elevation', 
        'created_time', 'updated_time')

    def create(self, validated_data):
        product = models.Product.objects.create(
            product_id = validated_data.get('product_id'),
            description = validated_data.get('description'),
            date_time = validated_data.get('date_time'),
            lat = validated_data.get('lat'),
            lng = validated_data.get('lng'),
            elevation = validated_data.get('elevation'),
        )
       
        return product

    def update(self, instance, validated_data):
        
        instance.product_id = validated_data.get('product_id', instance.product_id)
        instance.description = validated_data.get('description', instance.description)
        instance.date_time = validated_data.get('date_time', instance.date_time)
        instance.lat = validated_data.get('lat', instance.lat)
        instance.lng = validated_data.get('lng', instance.lng)
        instance.elevation = validated_data.get('elevation', instance.elevation)
        instance.save()
        
        return instance

    def destory(self, instance):
        
        instance.delete()
        
        return 'success'