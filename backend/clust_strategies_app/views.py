from rest_framework import  generics
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .serializer import AuthTokenSerializer,  CompanySerializer,RegistrationSerializer

class RegistrationAPIView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer

    def post(self,request):
        serializer= self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()

        return Response({"User":serializer.data})

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