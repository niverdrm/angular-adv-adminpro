import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription = new Subscription();
  public hospitalesTemp: Hospital[] = [];

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquesaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital._id, hospital.nombre)
      .subscribe((res) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  EliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id).subscribe((res) => {
      this.cargarHospitales();
      Swal.fire(
        'Eliminado',
        `El ${hospital.nombre} a sido eliminado`,
        'success'
      );
    });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    });

    if (value?.trim().length) {
      this.hospitalService.CrearHospital(value).subscribe((res) => {
        this.hospitales.push(res.hospital);
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id || '',
      hospital.img
    );
  }
  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }
    return this.busquesaService
      .buscar('hospitales', termino)
      .subscribe((res: any) => {
        this.hospitales = res;
      });
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
