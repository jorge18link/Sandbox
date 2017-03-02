from django.shortcuts import render_to_response
from sitio.models import Noticias, Syllabus
from django.http import HttpResponseRedirect
from sitio.forms import NoticiasForm
from sitio.forms import TopForm
from django.views.decorators.csrf import csrf_exempt
import services


def index(request):
    return render_to_response("index.html")
def ayudantias(request):
    return render_to_response("ayudantias.html")
def curso(request):
    query_resultos=Syllabus.objects.all();
    return render_to_response("curso.html",{'Syllabus':query_resultos})
def equipo(request):
    return render_to_response("equipo.html")
def semana(request):
    return render_to_response("semana.html")


@csrf_exempt
def noticias(request):
    query_results=Noticias.objects.all();
    if request.method =='POST':
        form=NoticiasForm(request.POST)
        if form.is_valid():
            titulo=request.POST.get('titulo','')
            asunto=request.POST.get('Asunto','')
            descripcion=request.POST.get('Descripcion', '')
            noticias_obj=Noticias(titulo=titulo,Asunto=asunto,Descripcion=descripcion)
            noticias_obj.save()
            return HttpResponseRedirect('/noticias')
    else:
        form= NoticiasForm
    return render_to_response( 'noticias.html',{'form': form,'query_results': query_results})

@csrf_exempt
def top (request):
    if request.method =='POST':
        form=TopForm(request.POST)
        print('d')
        if form.is_valid():
            print('funciona')
            paralelo=request.POST.get('paralelo', '')
            alumnos_list =services.get_top(paralelo);
            return render_to_response('Top.html', { 'list':alumnos_list})
    else:
        form= TopForm
    return render_to_response('Top.html', {'form': form} )
