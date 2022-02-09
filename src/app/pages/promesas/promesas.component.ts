import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() {
    fetch('https://reqres.in/api/users?page=2')
      .then((res) => res.json())
      .then((body) => console.log(body.data));
  }
}
