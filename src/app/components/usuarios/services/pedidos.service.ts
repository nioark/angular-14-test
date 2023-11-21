import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Pedido } from '../models/pedido.model';

import { DataResult } from '../../../models/data-result.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  url:string
  constructor(private http: HttpClient) {
    this.url=environment.backend
  }

  fetch(): Observable<Pedido[]> {
    return this.http.get<DataResult>(`${this.url}/pedidos`).pipe(
      map(data => data.data as Pedido[] || []),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }

  get(id: number): Observable<Pedido>{
    return this.http.get<DataResult>(`${this.url}/pedidos/${id}`).pipe(
      map(data => data.data as Pedido),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }

  add_pedido(pedido: Pedido): Observable<any> {
    const params = new HttpParams()
      .append('name', pedido.name)
      .append('quantidade', pedido.quantidade)
      .append('user_id', pedido.quantidade)

    return this.http.post(`${this.url}/pedidos`, "", {params: params});
  }

  edit_pedido(pedido: Pedido): Observable<any> {
    if (!pedido.id) {
      return throwError("Pedido sem id");
    }

    const params = new HttpParams()
    .append('name', pedido.name)
    .append('quantidade', pedido.quantidade)
    .append('user_id', pedido.usuarioid)

    return this.http.put(`${this.url}/pedidos/${pedido.id}`, "", {params: params});
  }

  remove(id : number): Observable<any>{
    return this.http.delete(`${this.url}/pedidos/${id}`);
  }
}
