
from django.urls import path, include
from django.contrib import admin



urlpatterns = [
    path('accounts/', include('clust_strategies_app.urls')),
    path('admin', admin.site.urls),
    path('api/auth/', include('rest_framework.urls'))
    
]