import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital = new Hospital('', '');
  public medicoSeleccionado: Medico = new Medico('', '');

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.cargaHospital();

    this.medicoForm
      .get('hospital')
      ?.valueChanges.subscribe((hospitalId: string) => {
        this.hospitalSeleccionado =
          this.hospitales.find((h) => h._id === hospitalId) ||
          new Hospital('', '');
      });

    this.activateRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      console.log('mierda');
      return;
    }

    this.medicoService
      .obtenerMedicoId(id)
      .pipe(delay(100))
      .subscribe((medico: any) => {
        if (!medico) {
          this.router.navigateByUrl(`/dashboard/medicos`);
          return;
        }

        const {
          nombre,
          hospital: { _id },
        } = medico;

        this.medicoSeleccionado = medico;

        this.medicoForm.setValue({ nombre, hospital: _id });
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      //actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };
      this.medicoService.actualizarMedico(data).subscribe((res) => {
        Swal.fire('actualizado', `${nombre} ha sido actualizado`, 'success');
      });
    } else {
      //crear

      this.medicoService
        .CrearMedico(this.medicoForm.value)
        .subscribe((medico: any) => {
          Swal.fire('Creado', `${nombre} ha sido creado`, 'success');
          this.router.navigateByUrl(`dashboard/medicos/${medico.medico._id}`);
        });
    }
  }

  cargaHospital() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }
}
