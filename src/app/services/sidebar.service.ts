import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      subMenu: [
        { titulo: 'Main', ruta: '/' },
        { titulo: 'ProgressBar', ruta: 'progress' },
        { titulo: 'Graficas', ruta: 'grafica1' },
        { titulo: 'Promesas', ruta: 'promesas' },
        { titulo: 'Rxjs', ruta: 'rxjs' },
      ],
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      subMenu: [
        { titulo: 'Usuarios', ruta: 'usuarios' },
        { titulo: 'Hospitales', ruta: 'hospitales' },
        { titulo: 'Medicos', ruta: 'medicos' },
      ],
    },
  ];

  constructor() {}
}
