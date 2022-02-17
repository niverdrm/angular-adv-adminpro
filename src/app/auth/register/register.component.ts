import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ['Niver Romero', Validators.required],
      email: ['test100@gmail.com', [Validators.required, Validators.email]],
      password: ['123', Validators.required],
      password2: ['123', Validators.required],
      terminos: [false, Validators.required],
    },
    {
      validators: this.passworIguales('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  crearUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (res) => {
        //navegar al dashboard
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        //Si sucede un error sweetAlert
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  validarCampo(campo: string): boolean {
    return this.registerForm.get(campo)?.invalid && this.formSubmitted
      ? true
      : false;
  }

  aceptarTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    return pass1 !== pass2 && this.formSubmitted;
  }

  passworIguales(passwordName: string, password2Name: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(passwordName);
      const password2Control = formGroup.get(password2Name);
      if (passwordControl?.value === password2Control?.value) {
        password2Control?.setErrors(null);
      } else {
        password2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}

// import swal from 'sweetalert';
