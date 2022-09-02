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
import {AddDatasetComponent} from './components/add-dataset/add-dataset.component';
import {EditDatasetComponent} from './components/edit-dataset/edit-dataset.component';
import {ClientInfoComponent} from './components/client-info/client-info.component';
import {EditClientInfoComponent} from './components/edit-client-info/edit-client-info.component';


const routes: Routes = [
  {path: '', redirectTo: '/Inicio',pathMatch: 'full'},
  {path: 'Inicio', component: InicioComponent},
  {path: 'Perfil', component: MiPerfilComponent},
  {path: 'GestionDeDatos',component: GestionDeDatosComponent},
  {path: 'Analisis', component: HerramientaDeAnalisisComponent},
  {path: 'Ayuda', component: AyudaComponent},
  {path: 'Login',component: LoginComponent},
  {path: 'Register',component: RegisterComponent},
  {path: 'ForgotPassword',component: ForgotPasswordComponent},
  {path: 'AddDataset',component: AddDatasetComponent},
  {path: 'EditDataset/:id',component:EditDatasetComponent},
  {path: 'ClientInfo/:id',component:ClientInfoComponent},
  {path: 'EditClientInfo/:id',component: EditClientInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
