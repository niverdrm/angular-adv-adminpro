import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription = new Subscription();

  constructor(
    private usuarioService: UsuarioService,
    private busquesaService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService
      .cargarUsuario(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.usuarios = this.usuariosTemp);
    }
    return this.busquesaService
      .buscar('usuarios', termino)
      .subscribe((res: any) => {
        this.usuarios = res;
      });
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puedes Eliminar este usuario', 'error');
    }
    return Swal.fire({
      title: 'Borrar Usuario?',
      text: `Esta a punto de eliminar el usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si , Borrar',
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((res) => {
          this.cargarUsuarios();
          Swal.fire(
            'usuario eliminado',
            `${usuario.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('error', 'Este usuario no puede cambiar role', 'error');
    }

    return this.usuarioService.CambiarUsuario(usuario).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'No se pudo cambiar el rol del usuairo', 'error');
      }
    );
  }

  abrirModal(usuairo: Usuario) {
    this.modalImagenService.abrirModal(
      'usuarios',
      usuairo.uid || '',
      usuairo.img
    );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
