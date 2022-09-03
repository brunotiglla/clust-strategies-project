import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//components
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { GestionDeDatosComponent } from './components/gestion-de-datos/gestion-de-datos.component';
import { HerramientaDeAnalisisComponent } from './components/herramienta-de-analisis/herramienta-de-analisis.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { LoginComponent } from './components/login/login.component'; 
// old components
//import {LoginComponent} from './vistas/login/login.component'
//material
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AddDatasetComponent } from './components/add-dataset/add-dataset.component';
import { EditDatasetComponent } from './components/edit-dataset/edit-dataset.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { EditClientInfoComponent } from './components/edit-client-info/edit-client-info.component';


// Servicios

import { ApiService } from './servicios/api/api.service'
 

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    InicioComponent,
    MiPerfilComponent,
    GestionDeDatosComponent,
    HerramientaDeAnalisisComponent,
    AyudaComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AddDatasetComponent,
    EditDatasetComponent,
    ClientInfoComponent,
    EditClientInfoComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

