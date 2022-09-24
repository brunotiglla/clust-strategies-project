#from crypt import methods
import imp
from urllib import response
from rest_framework import viewsets
from . import models
from . import serializers


import csv

from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage

#from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
#from rest_framework.parsers import FileUploadParser,FormParser,MultiPartParser as parsers
import rest_framework.parsers as parsers

import pandas as pd
import pickle
from pathlib import Path

fs = FileSystemStorage(location='tmp/')



class DataSetViewset(viewsets.ModelViewSet):
    queryset = models.DataSet.objects.all()
    serializer_class = serializers.DataSetSerializer

    @action(detail = False, methods=['GET'])
    def get_dataset(self, request):
        #print(request.query_params)
        c_id = request.query_params["c_id"]
        #print(c_id)

        dataset = models.DataSet.objects.filter(company_id = c_id)
        
        
        serializer = serializers.DataSetSerializer(dataset, many = True)

        return Response(serializer.data)
    
from sklearn import preprocessing, decomposition
from sklearn.impute import KNNImputer
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import f1_score,precision_score,recall_score,accuracy_score,classification_report,confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.datasets import make_regression
from sklearn.tree import DecisionTreeRegressor

class ClientInfoViewset(viewsets.ModelViewSet):
    queryset = models.Client_Info.objects.all()
    serializer_class = serializers.ClientInfoSerialize
    parser_classes = (parsers.MultiPartParser,)

    HERE = Path(__file__).parent

    model = pickle.load(open(HERE / 'model.pkl','rb'))
    @action(detail=False,methods=['GET'])
    def use_model(self,request):
        print("a")

    @action(detail = False, methods=['GET'])
    def get_with_fk(self, request):
        #c_id = request.query_params["c_id"]

        #print(request.query_params)
        d_id = request.query_params["d_id"]
        #print(d_id)

        #aux = models.Client_Info.objects.get(company_id = c_id)
        client_info = models.Client_Info.objects.filter(dataset_id = d_id)
        print(client_info)
        serializer = serializers.ClientInfoSerialize(client_info, many = True)

        return Response(serializer.data)
    

    @action(detail=False, methods=['POST'])
    def upload_data(self, request):

        print(request.data)
#
        print(request.FILES)
        #return Response(":)")
        
        
        file = request.FILES["file"]
        
        c_id = request.data["c_id"]
        d_id = request.data["d_id"]
        print(c_id,d_id)

        content = file.read()

        file_content= ContentFile(content)
        file_name = fs.save(
            "_tmp.csv",file_content
        )

        tmp_file = fs.path(file_name)

        csv_file = open(tmp_file,errors="ignore")
        reader = csv.reader(csv_file)
        next(reader)

        info_list = []
        print(1)
        for id_, row in enumerate(reader):
            (
                ID,
                Gender,
                Ever_Married,
                Age,
                Graduated,
                Profession,
                Work_Experience,
                Spending_Score,
                Family_Size,
                Var_1
            ) = row

            info_list.append(
                models.Client_Info(
                    company_id = models.Company.objects.get(id=c_id),
                    dataset_id = models.DataSet.objects.get(id=d_id),
                    aux_id = ID,
                    Gender = Gender,
                    Ever_Married = Ever_Married,
                    Age = Age,
                    Graduated = Graduated,
                    Profession = Profession,
                    Work_Experience = Work_Experience,
                    Spending_Score = Spending_Score,
                    Family_Size = Family_Size,
                    Var_1 = Var_1,
                    #client_name = client_name,
                    #client_gender = client_gender,
                    #client_income = client_income,
                    #client_expenses = client_expenses,
                )
            )
        models.Client_Info.objects.bulk_create(info_list)
        print(1)

        return Response("Data importada correctamente")