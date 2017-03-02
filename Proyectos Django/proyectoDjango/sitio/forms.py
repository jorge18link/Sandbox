from django import forms

class NoticiasForm(forms.Form):
    titulo=forms.CharField(label='Titulo',max_length=30) 
    Asunto=forms.CharField(label='Autor',max_length=30) 
    Descripcion=forms.CharField(label='Descripcion',max_length=300)

class TopForm(forms.Form):
    paralelo=forms.CharField(max_length=20)