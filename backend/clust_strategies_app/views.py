from rest_framework import  generics
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .forms import AuthTokenSerializer,  CompanySerializer



class AccountViewSet(generics.CreateAPIView):
    serializer_class = CompanySerializer

class LoginView(ObtainAuthToken):

    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializers = self.serializer_class(data=request.data, context={'request':request})
        serializers.is_valid(raise_exception=True)
        user = serializers.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token':token.key,
            'username':user.username,
            'user_id':user.id,
            'email': user.email,
            'admin_name': user.admin_name
        })