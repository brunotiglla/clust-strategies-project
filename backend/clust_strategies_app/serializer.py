from asyncore import write
from dataclasses import field
import email
import imp
from msilib.schema import Class
from unittest.util import _MAX_LENGTH
from django.contrib.auth.forms import UserCreationForm
#from django.contrib.auth.models  import User
from django.contrib.auth import  get_user_model, authenticate

from rest_framework import serializers

from .models import Company

class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 50, min_length = 6)
    username = serializers.CharField(max_length = 50, min_length = 4)

    password = serializers.CharField(max_length = 150, write_only=True)

    class Meta:
        model = Company
        fields = ('username', 'email', 'password',  'admin_name')

    def validate(self, attrs):
        email = attrs.get('email',None)
        username = attrs.get('username',None)
        if Company.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': ('email already exist')})
        if Company.objects.filter(username=username).exists():
            raise serializers.ValidationError({'username': ('username already exist')})
        
        return super().validate(attrs)

    def create(self, validated_data):
        #return 
        return super().create(validated_data)

class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'password',  'admin_name')
        extra_kwargs = {'password': {'write_only': True, 'min_length' : 5}}

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)



class AuthTokenSerializer(serializers.Serializer):
    email =serializers.CharField()
    password = serializers.CharField(
        style = {'input_type':'password'},
        trim_whitespace = False
    )
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request = self.context.get('request'),
            email = email,
            password = password
        )
        if not user:
            raise serializers.ValidationError("Invalidate")
        attrs['user'] = user
        return attrs


