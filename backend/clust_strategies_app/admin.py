from django.contrib import admin
from rest_framework.authtoken.admin import TokenAdmin
from .models import Company, DataSet, Client_Info

#TokenAdmin.raw_id_fields = ['user']
admin.site.register(Company)
admin.site.register(DataSet)
admin.site.register(Client_Info)