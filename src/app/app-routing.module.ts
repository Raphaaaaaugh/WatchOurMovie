import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { DisponibilityComponent } from './disponibility/disponibility.component';
import { HomeComponent } from './home/home.component';
import { ListDispoComponent } from './list-dispo/list-dispo.component';
import { LoginComponent } from './login/login.component';
import { MatterComponent } from './matter/matter.component';
import { RegisterComponent } from './register/register.component';
import { SpecialityComponent } from './speciality/speciality.component';

const routes: Routes = [
  {
    path:'disponibility', component :DisponibilityComponent
  },
  {
    path:'speciality', component :SpecialityComponent
  },
  {
    path:'matter', component :MatterComponent
  },
  {
    path:'listDisponibility', component :ListDispoComponent
  },
  {
    path:'login', component :LoginComponent
  },
  {
    path:'register', component :RegisterComponent
  },
  {
    path:'home', component :HomeComponent
  },
  {
    path:'', component :HomeComponent
  },
  {
    path:'calendrier', component :CalendrierComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
