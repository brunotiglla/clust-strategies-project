from dataclasses import field
import imp
from pyexpat import model
from rest_framework import serializers
from .models import DataSet, Client_Info,Cluster_Results

class DataSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataSet
        fields = '__all__'

class ClientInfoSerialize(serializers.ModelSerializer):
    class Meta:
        model = Client_Info
        fields = '__all__'

class ClusterResultsSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Cluster_Results
        fields = '__all__'