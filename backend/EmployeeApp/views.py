from multiprocessing import AuthenticationError
from django.shortcuts import render
from .models import Employee
# Create your views here.

def index(request, path=''):
    """
    The home page. This renders the container for the single-page app.
    """
    return render(request, 'index.html')