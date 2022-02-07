import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  // tomo como nombre progreso en el  componente padre--- recibe del padre
  // @Input() progreso: number = 20;

  // tomo como nombre valor en el  componente padre pero en este archivo ts es proreso
  @Input('valor') progreso: number = 20;
  @Input() btnClass: string = 'btn-primary';

  //envia al componente padre

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.btnClass = `btn + ${this.btnClass}`;
  }

  cambiarValor(valor: number) {
    if (this.progreso > 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return (this.progreso = 100);
    }
    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return (this.progreso = 0);
    }
    this.valorSalida.emit((this.progreso = this.progreso + valor));
    return (this.progreso = this.progreso + valor);
  }
  onChange(Nuevovalor: number) {
    if (Nuevovalor >= 100) {
      this.progreso = 100;
    } else if (Nuevovalor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = Nuevovalor;
    }
    this.valorSalida.emit(this.progreso);
  }
}
