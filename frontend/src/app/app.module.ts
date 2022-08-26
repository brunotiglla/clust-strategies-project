import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
//material
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';



 

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    InicioComponent,
    MiPerfilComponent,
    GestionDeDatosComponent,
    HerramientaDeAnalisisComponent,
    AyudaComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

