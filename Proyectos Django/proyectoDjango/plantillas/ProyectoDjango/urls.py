from django.conf.urls import url
from django.conf import settings
from sitio import views 

urlpatterns =[
    url(r'^$',views.index),
    url(r'^semana/$',views.semana),
    url(r'^curso/$',views.curso), 
    url(r'^ayudantias/$',views.ayudantias),
    url(r'^equipo/$',views.equipo)
    ]