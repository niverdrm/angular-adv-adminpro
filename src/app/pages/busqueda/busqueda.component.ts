import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private busquedaService: BusquedasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino);
    });
  }

  busquedaGlobal(termino: string) {
    this.busquedaService.busquedaGlobal(termino).subscribe((res: any) => {
      this.usuarios = res.usuarios;
      this.medicos = res.medico;
      this.hospitales = res.hospital;
    });
  }

  abrirMedico(medico: Medico) {
    console.log(medico);
  }
}
