
from django.urls import path, include
from backend.EmployeeApp import views
from rest_framework import  routers
from rest_framework.authtoken.views import ObtainAuthToken

# Routers provide a way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', views.Employee)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', ObtainAuthToken.as_view()),
]