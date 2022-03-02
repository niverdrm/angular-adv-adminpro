import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  cargarHospitales() {
    const url = `${base_url}/hospitales`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(
        map((res: { ok: boolean; hospitales: Hospital[] }) => res.hospitales)
      );
  }

  CrearHospital(nombre: string) {
    const url = `${base_url}/hospitales`;
    return this.http.post<any>(url, { nombre }, this.headers);
    // .pipe(
    //   map((res: { ok: boolean; hospitales: Hospital[] }) => res.hospitales)
    // );
  }
  actualizarHospital(_id: string, nombre: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put<any>(url, { nombre }, this.headers);
    // .pipe(
    //   map((res: { ok: boolean; hospitales: Hospital[] }) => res.hospitales)
    // );
  }
  borrarHospital(_id: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete<any>(url, this.headers);
    // .pipe(
    //   map((res: { ok: boolean; hospitales: Hospital[] }) => res.hospitales)
    // );
  }
}
