#from crypt import methods
from asyncio.windows_events import NULL
import imp
from pyexpat import model
from unittest import result
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
import numpy as np

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
#from sklearn.metrics import f1_score,precision_score,recall_score,accuracy_score,classification_report,confusion_matrix
#from sklearn.model_selection import train_test_split
#from sklearn.neighbors import KNeighborsClassifier
#from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
#from sklearn.datasets import make_regression
#from sklearn.tree import DecisionTreeRegressor

class ClientInfoViewset(viewsets.ModelViewSet):
    queryset = models.Client_Info.objects.all()
    serializer_class = serializers.ClientInfoSerialize
    parser_classes = (parsers.MultiPartParser,)

    HERE = Path(__file__).parent

    predictModel = pickle.load(open(HERE / 'model.pkl','rb'))
    def get_encoded_dict(_,df,lst):

        #print(df)
        #print(type(df))
        #print("==============================")
        #print(lst)
        #print(type(df))
        #return 
        """
        this function creates dictionary for encoding. Its find unique labels for each column and enumerate them

        Arguments:
        df -- pandas dataframe
        lst -- list of columns which we want to encode 

        Returns:
        dictionary where key is column name and value is dictionary of unique labels and encoding value
        """
        encoded_dict = {}
        for col in lst:
            each_dict = {}
            sorted_unique_names = df[col].dropna().unique()
            sorted_unique_names.sort()
            for i,val in enumerate(sorted_unique_names):
                each_dict[val] = i
            encoded_dict[col] = each_dict
        return encoded_dict


    @action(detail=False,methods=['GET'])
    def use_model(self,request):
        #print(request.data)
        #lista para IDs
        #listID = list()
        #for  key in request.query_params:
        #    listID.append(request.query_params[key])
        #print(listID)

        df=pd.DataFrame()
        d_id = request.query_params["d_id"]
        client_info = models.Client_Info.objects.filter(dataset_id = d_id)
        serializer = serializers.ClientInfoSerialize(client_info, many = True)
        aux=pd.DataFrame(serializer.data)
        df = df.append(aux)
        df = df.drop('abcd',axis = 0)
        #df = df.drop('')
        #for elem in listID:
        #    client_info = models.Client_Info.objects.filter(dataset_id = elem)
        #    #client_info = pd.DataFrame(list(models.Client_Info.objects.filter(dataset_id = elem)))
        #    #print(client_info)
        #    serializer = serializers.ClientInfoSerialize(client_info, many = True)
        #    aux=pd.DataFrame(serializer.data)
        #    df = df.append(aux)
        #    #print(aux)
        #    #print()
        print(df)
        aux = df.copy()
        print(type(df))
        print('-------------------------------------------------')
        df.drop(['id','company_id','dataset_id'],axis=1,inplace=True)
        df.rename(columns={'aux_id':'ID'},inplace=True)
        #df=df.rename({'Female':0,'Male':1},inplace=True)
        #df=df.rename({'No':0,'Yes':1},inplace=True)
        ##from colab
        #print(type(df))
        #encoded_dict = 
        #result = df.apply(self.get_encoded_dict(df.,['Gender','Ever_Married','Graduated','Profession','Spending_Score','Var_1','Segmentation']))
        #print(result)
        #self.get_encoded_dict(df)#,['Gender','Ever_Married','Graduated','Profession','Spending_Score','Var_1','Segmentation'])
        #print(encoded_dict)
        #scaler = MinMaxScaler()
        #columns_to_normalize = ['Age','Profession','Work_Experience','Spending_Score','Family_Size','Var_1']
        #df[columns_to_normalize]=scaler.fit_transform(df[columns_to_normalize])
        ###end colab
        #print(df)
        #answer = self.predictModel.predict(df)
        #print(answer)


        #========================
        encoded_dict = self.get_encoded_dict(df,["Gender","Ever_Married","Graduated","Profession","Spending_Score","Var_1"])
        #print(encoded_dict)

        df = df.replace(encoded_dict)
        scaler = MinMaxScaler()
        columns_to_normalize = ['Age','Profession','Work_Experience','Spending_Score','Family_Size','Var_1']

        df[columns_to_normalize] = scaler.fit_transform(df[columns_to_normalize])
        imputer = KNNImputer()
        df[df.columns.drop(["ID"])] = np.round(imputer.fit_transform(df.drop(columns = ["ID"])))
        #df.drop('ID',axis=1,inplace=True)

        
        

        print(df)
        print("=======================")
        pca = decomposition.PCA(n_components=2)
        data = pca.fit_transform(df.drop(columns=["ID","Gender","Spending_Score"]))
        print(data)

        answer = self.predictModel.predict(data)
        print(answer)
        print("_________________________________")
        print("_________________________________")
        print("_________________________________")
        print("normal version")

        aux['k_means_label'] = answer


        #data=data.reset_index()
        #df_kmeans = pd.DataFrame(answer)
        #df_kmeans.columns = ["k-means_label"]

        #df=pd.concat([df,df_kmeans],axis=1)
        print(aux)

        print("normalziaed")
        df['k-means_label'] = answer
        print(df)
        #serializer = serializers.ClientInfoSerialize(df, many = True)
        print("============================")
        print("============================")
        print("============================")

        #grouped_df = aux.groupby("k_means_label")
        #for key, item in grouped_df:
        #    print(grouped_df.get_group(key), "\n\n")

        aux = aux.sort_values("k_means_label")
        print(aux)




        #return Response(aux)
        return Response(":)")



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
        emptyValue = False
        
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
            
            for elem in row:
                if elem == "":
                    indexOfNull = row.index(elem)
                    
                    row[indexOfNull] = "abcd"
                    #print(elem," F")
                    print(row)
                    #emptyValue = True
                    
            #if emptyValue:
            #    return Response("Error")
                

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
        #print(type(row))
        #return Response(":)")
        models.Client_Info.objects.bulk_create(info_list)
        #print(1)

        return Response("Data importada correctamente")