
from django.urls import path, include

from rest_framework import  routers
from rest_framework.authtoken.views import ObtainAuthToken

# Routers provide a way of automatically determining the URL conf.



# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [

    path('api-auth/', ObtainAuthToken.as_view()),
]