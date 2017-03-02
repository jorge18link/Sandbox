import requests
def get_top(paralelo):
    r = requests.get('http://localhost:3000/cursos/obtener/top5/' + paralelo)
    alumnos=r.json();
    print alumnos;
    alumnos_list = {'alumnos': alumnos}
    return alumnos_list