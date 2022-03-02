import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
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

  cargarMedicos() {
    const url = `${base_url}/medicos`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(map((res: { ok: boolean; medicos: Medico[] }) => res.medicos));
  }

  //Obtener medicos por id
  obtenerMedicoId(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(map((res: { ok: boolean; medico: Medico }) => res.medico));
  }

  CrearMedico(medico: { nombre: string; hospital: string }) {
    const url = `${base_url}/medicos`;
    return this.http.post<any>(url, medico, this.headers);
  }
  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put<any>(url, medico, this.headers);
  }
  borrarMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete<any>(url, this.headers);
  }
}
