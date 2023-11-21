import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { DataResult } from '../../../models/data-result.model';
import { throwError } from 'rxjs';
import { Pedido } from '../../pedidos/models/pedido.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
  })
};

const headers = { 'Content-Type': 'application/json' };

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url:string
  constructor(private http: HttpClient) {
    this.url=environment.backend
  }

  fetch(): Observable<Usuario[]> {
    return this.http.get<DataResult>(`${this.url}/usuarios`).pipe(
      map(data => data.data as Usuario[] || []),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }

  getPedidos(id:number) {
    return this.http.get<DataResult>(`${this.url}/usuarios/${id}/pedidos`).pipe(
      map(data => data.data as Pedido[] || []),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }

  get(id: number): Observable<Usuario>{
    return this.http.get<DataResult>(`${this.url}/usuarios/${id}`).pipe(
      map(data => data.data as Usuario),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }

  add_user(Usuario: Usuario): Observable<any> {
    const params = new HttpParams()
    .append('name', Usuario.name)
    .append('password', Usuario.password);

    return this.http.post(`${this.url}/usuarios`, "", {params: params});
  }

  edit_user(usuario: Usuario): Observable<any> {
    if (!usuario.id) {
      return throwError("Usuario sem id");
    }

    const params = new HttpParams()
    .append('name', usuario.name)
    .append('password', usuario.password);

    return this.http.put(`${this.url}/usuarios/${usuario.id}`, "", {params: params});
  }

  remove(id : number): Observable<any>{
    return this.http.delete(`${this.url}/usuarios/${id}`);
  }


}
