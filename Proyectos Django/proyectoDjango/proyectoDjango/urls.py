from django.conf.urls import url
from sitio import views 


urlpatterns = [
    url(r'^$',views.index),
    url(r'^semana/$',views.semana),
    url(r'^curso/$',views.curso),
    url(r'^equipo/$',views.equipo),
    url(r'^noticias/$',views.noticias),
    url(r'^ayudantias/$',views.ayudantias), 
    url(r'^Top/$',views.top),

]

