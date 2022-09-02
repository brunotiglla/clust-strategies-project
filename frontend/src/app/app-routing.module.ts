import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// old components
//import {LoginComponent} from './vistas/login/login.component'

//components
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { GestionDeDatosComponent } from './components/gestion-de-datos/gestion-de-datos.component';
import { HerramientaDeAnalisisComponent } from './components/herramienta-de-analisis/herramienta-de-analisis.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { LoginComponent } from './components/login/login.component'; 
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/Inicio',pathMatch: 'full'},
  {path: 'Inicio', component: InicioComponent},
  {path: 'Perfil', component: MiPerfilComponent},
  {path: 'GestionDeDatos',component: GestionDeDatosComponent},
  {path: 'Analisis', component: HerramientaDeAnalisisComponent},
  {path: 'Ayuda', component: AyudaComponent},
  {path: 'Login',component: LoginComponent},
  {path: 'Register',component: RegisterComponent},
  {path: 'ForgotPassword',component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
