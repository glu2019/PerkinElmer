from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.documentation import include_docs_urls
from drf import views

urlpatterns = format_suffix_patterns([
    url(r'^docs/', include_docs_urls(title="Texada Rest APIs")),
    url(r'^product-delete/(?P<pk>[0-9]+)/$', views.DestroyProduct.as_view()),
    url(r'^product/(?P<pk>[0-9]+)/$', views.UpdateProduct.as_view()),
    url(r'^product/', views.ListCreateProduct.as_view()),
])
