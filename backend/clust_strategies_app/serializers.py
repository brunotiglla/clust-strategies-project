from dataclasses import field
import imp
from rest_framework import serializers
from .models import DataSet, Client_Info

class DataSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataSet
        fields = '__all__'

class ClientInfoSerialize(serializers.ModelSerializer):
    class Meta:
        model = Client_Info
        fields = '__all__'