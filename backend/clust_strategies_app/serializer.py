from msilib.schema import Class
from django.contrib.auth.forms import UserCreationForm
#from django.contrib.auth.models  import User
from django.contrib.auth import  get_user_model, authenticate

from rest_framework import serializers

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


