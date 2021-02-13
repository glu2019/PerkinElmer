import django_filters
from drf import models

class ProductFilter(django_filters.FilterSet):

    class Meta:
        model = models.Product
        fields = {
            'description': ['icontains'],
        }