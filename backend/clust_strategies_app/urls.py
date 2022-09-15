from django.urls import path
from clust_strategies_app import views
# from .views import AccountViewSet, LoginView

#JWT expor view
# from rest_framework_simplejwt import views as jwt_views




urlpatterns = [
   
    path('register/', views.RegistrationAPIView.as_view(), name='register'),
    #path('register/', views.AccountViewSet.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login')
  



]
