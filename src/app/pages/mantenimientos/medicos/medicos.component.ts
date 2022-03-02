import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription = new Subscription();

  constructor(
    private medicosService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquesaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicosService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id || '', medico.img);
  }

  buscarMedico(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }
    return this.busquesaService
      .buscar('medicos', termino)
      .subscribe((res: any) => {
        this.medicos = res;
      });
  }

  borrarMedico(medico: Medico) {
    return Swal.fire({
      title: 'Borrar Medico?',
      text: `Esta a punto de eliminar el Medico ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si , Borrar',
    }).then((result) => {
      if (result.value) {
        this.medicosService.borrarMedico(medico._id || '').subscribe((res) => {
          this.cargarMedicos();
          Swal.fire(
            'usuario eliminado',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
