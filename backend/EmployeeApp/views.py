from multiprocessing import AuthenticationError
from django.shortcuts import render
from .models import Employee
# Create your views here.

class loginView(APIView):
    def post(self, request):
        email: request.data['email']
        password: request.data['password']
        
        user:Employee.objects.filter(email = email).first()

    