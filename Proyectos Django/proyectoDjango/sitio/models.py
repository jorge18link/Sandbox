from django.db import models

class Noticias(models.Model):
    titulo=models.CharField(max_length=30) 
    Asunto=models.CharField(max_length=30) 
    Descripcion=models.CharField(max_length=300)




class Info_Politicas(models.Model):
    titulo=models.CharField(max_length=300) 
    consultas=models.CharField(max_length=300) 
    examenes=models.CharField(max_length=300) 
    evaluacion=models.CharField(max_length=300)
    tarea=models.CharField(max_length=300) 

class Syllabus(models.Model):
    semana=models.CharField(max_length=30) 
    objectivo=models.CharField(max_length=300)
    descripcion=models.CharField(max_length=300)