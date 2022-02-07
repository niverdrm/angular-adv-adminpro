import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  // public colors: Color[] = [
  //   { background:  }
  // ];

  // [('#9E120E', '#FF5800', '#FFB414')];

  public labels1: string[] = ['prueba1', 'prueba2', 'prueba3'];

  data1 = [350, 450, 100];

  constructor() {}

  ngOnInit(): void {}
}
