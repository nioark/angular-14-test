import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pedido } from '../models/pedido.model';

import { DataResult } from '../../../models/data-result.model';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class PedidosService {
  created = new Subject<Pedido>()
  updated = new Subject<Pedido>()
  removed = new Subject<Pedido>()

  url:string
  constructor(private http: HttpClient) {
    this.url=environment.backend
  }

  fetch(): Observable<Pedido[]> {
    return this.http.get<DataResult<Pedido[]>>(`${this.url}/pedidos`).pipe(
      map(data => data.data || []),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }

  get(id: number): Observable<Pedido>{
    return this.http.get<DataResult<Pedido>>(`${this.url}/pedidos/${id}`).pipe(
      map(data => data.data as Pedido),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }

  get_pedidos_from_user(userid:number) {
    return this.http.get<DataResult<Pedido[]>>(`${this.url}/usuarios/${userid}/pedidos`).pipe(
      map(data => data.data as Pedido[] || []),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }

  add_pedido(pedido: Pedido): Observable<any> {
    const params = new HttpParams()
      .append('name', pedido.name)
      .append('quantidade', pedido.quantidade)
      .append('usuarioid', pedido.quantidade)

    return this.http.post<DataResult<Pedido>>(`${this.url}/pedidos`, "", {params: params}).pipe(tap({
      next:(data)=> {
        if(data.data===undefined) return
        this.created.next(data.data)
      }
    }));
  }

  edit_pedido(pedido: Pedido): Observable<any> {
    if (!pedido.id) {
      return throwError("Pedido sem id");
    }

    const params = new HttpParams()
    .append('name', pedido.name)
    .append('quantidade', pedido.quantidade)
    .append('usuarioid', pedido.usuarioid)

    return this.http.put<DataResult<Pedido>>(`${this.url}/pedidos/${pedido.id}`, "", {params: params}).pipe(tap({
      next:(data)=> {
        if(data.data===undefined) return
        this.updated.next(data.data)
      }
    }));
  }

  remove(id : number): Observable<any>{
    return this.http.delete<DataResult<Pedido>>(`${this.url}/pedidos/${id}`).pipe(tap({
      next:(data)=> {
        if(data.data===undefined) return
        this.removed.next(data.data)
      }
    }));
  }
}
