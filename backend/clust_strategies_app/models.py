
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

# Create your models here.

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance) 

class AccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have a valid email address.')

        if not kwargs.get('username'):
            raise ValueError('Users must have a valid username.')

        account = self.model(
            email=self.normalize_email(email), username=kwargs.get('username')
        )

        account.set_password(password)
        account.save(using=self._db)

        return account

    def create_superuser(self, email, password, **kwargs):
        account = self.create_user(email, password, **kwargs)
        account.is_staff = True
        account.is_superuser = True
        account.is_admin = True
        account.save()

        return account



class Company(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=250, unique=True) #Company_name
    email = models.EmailField( unique=True)
    password = models.CharField(max_length=250)
    admin_name = models.CharField(max_length=250)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email



class DataSet(models.Model):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE) ##
    file_name = models.CharField(max_length=250)
    created_timestamp = models.DateField()

    def __str__(self):
        return self.file_name


class Client_Info(models.Model):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    dataset_id = models.ForeignKey(DataSet, on_delete=models.CASCADE)
    client_name = models.CharField(max_length=250)
    client_gender = models.CharField(max_length=250)
    client_income = models.CharField(max_length=250)
    client_expenses = models.CharField(max_length=250)

    def __str__(self):
        return self.client_name



