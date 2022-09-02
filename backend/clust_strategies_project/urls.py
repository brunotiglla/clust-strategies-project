
from django.urls import path, include
from django.contrib import admin



urlpatterns = [
   #path('accounts/', include('django.contrib.auth.urls')),
    path('admin/', admin.site.urls),
    path('api/accounts/', include('clust_strategies_app.urls')),
    
]