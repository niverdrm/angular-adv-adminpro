import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//Guards
import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimiento
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { titulo: 'Graficas #1' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Accoutn-Sentiings' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { titulo: 'Promesas' },
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { titulo: 'Perfil de Usuario' },
      },
      {
        path: 'buscar/:termino',
        component: BusquedaComponent,
        data: { titulo: 'Busqueda' },
      },

      //Mantenimiengo

      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { titulo: 'Hospitales de la aplicaciòn' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { titulo: 'Medicos de la aplicaciòn' },
      },
      {
        path: 'medicos/:id',
        component: MedicoComponent,
        data: { titulo: 'Medicos de la aplicaciòn' },
      },

      //rutas admin
      {
        path: 'usuarios',
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: { titulo: 'Usario de la aplicaciòn' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
