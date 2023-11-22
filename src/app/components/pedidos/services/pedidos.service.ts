import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pedido } from '../models/pedido.model';

import { DataResult } from '../../../models/data-result.model';
import { throwError } from 'rxjs';
import { ListenData } from 'src/app/models/listen-data.model';


@Injectable({
  providedIn: 'root'
})


export class PedidosService {
  list: ListenData<Pedido>|undefined

  url:string
  constructor(private http: HttpClient) {
    this.url=environment.backend
  }

  fetch(): Observable<Pedido[]> {
    return this.http.get<DataResult<Pedido[]>>(`${this.url}/pedidos`).pipe(
      map(data => data?.data?.length ? data.data : []),
      tap({
        next: data=> this.list = new ListenData<Pedido>(data)
      }),
      switchMap((data) => this.list  ? this.list?.data$ : of(data)),
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
          this.list?.add(data.data)
        }
      }))
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
        this.list?.edit(data.data)
      }
    }));
  }

  remove(id : number): Observable<any>{
    return this.http.delete<DataResult<Pedido>>(`${this.url}/pedidos/${id}`).pipe(tap({
      next:(data)=> {
        if(data.data?.id===undefined) return
        this.list?.delete(data.data.id)
      }
    }));
  }
}
