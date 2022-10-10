
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from sklearn import cluster

# Create your models here.

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **extrafields):
    if created:
        Token.objects.create(user=instance) 

class AccountManager(BaseUserManager):
    def create_user(self, email, username=None, password=None, **extrafields):
        if not email:
            raise ValueError('Users must have a valid email address.')
        account = self.model( username=username, email=self.normalize_email(email), **extrafields)
        account.set_password(password)
        account.save(using=self._db)

        return account

    def create_superuser(self, email, password, username=None):
        account = self.create_user(email, username, password)
        account.is_staff = True
        account.is_superuser = True
        account.save()

        return account



class Company(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=250, unique=True, null=True) #Company_name
    email = models.EmailField( unique=True)
    password = models.CharField(max_length=250)
    admin_name = models.CharField(max_length=250)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = AccountManager()

    USERNAME_FIELD = 'email'
    

    def __str__(self):
        return self.email



class DataSet(models.Model):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE) ##
    file_name = models.CharField(max_length=250)
    created_timestamp = models.DateField()

    def __str__(self):
        return self.file_name

class Cluster_Results(models.Model):
    dataset_id = models.ForeignKey(DataSet, on_delete=models.CASCADE)
    cluster = models.CharField(max_length=10)
    aux_id = models.CharField(max_length=250)
    Gender = models.CharField(max_length=250)
    Ever_Married = models.CharField(max_length=250)
    Age = models.CharField(max_length=250)
    Graduated = models.CharField(max_length=250)
    Profession = models.CharField(max_length=250)
    Work_Experience = models.CharField(max_length=250)
    Spending_Score = models.CharField(max_length=250)
    Family_Size = models.CharField(max_length=250)
    Var_1 = models.CharField(max_length=250)

    def __str__(self):
       return self.aux_id


class Client_Info(models.Model):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    dataset_id = models.ForeignKey(DataSet, on_delete=models.CASCADE)
    aux_id = models.CharField(max_length=250)
    Gender = models.CharField(max_length=250)
    Ever_Married = models.CharField(max_length=250)
    Age = models.CharField(max_length=250)
    Graduated = models.CharField(max_length=250)
    Profession = models.CharField(max_length=250)
    Work_Experience = models.CharField(max_length=250)
    Spending_Score = models.CharField(max_length=250)
    Family_Size = models.CharField(max_length=250)
    Var_1 = models.CharField(max_length=250)

    #old
    #client_name = models.CharField(max_length=250)
    #client_gender = models.CharField(max_length=250)
    #client_income = models.CharField(max_length=250)
    #client_expenses = models.CharField(max_length=250)

    def __str__(self):
        return self.aux_id



