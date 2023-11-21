import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  Subject,   map,   startWith, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { DataResult } from '../../../models/data-result.model';
import { throwError } from 'rxjs';
import { Pedido } from '../../pedidos/models/pedido.model';

class MySubject<T> extends Subject<T> {
  constructor(){
    super();
  }

  override next(value: T) {
    super.next(value)
    super.next(null as unknown as T)
  }
}

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
  created = new MySubject<Usuario>() //.pipe(startWith(null));
  updated = new MySubject<Usuario>()
  removed = new MySubject<Usuario>()

  url:string
  constructor(private http: HttpClient) {
    this.url=environment.backend
  }

  fetch(): Observable<Usuario[]> {
    return this.http.get<DataResult<Usuario[]>>(`${this.url}/usuarios`).pipe(
      map(data => data?.data?.length ? data.data : []),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }



  get(id: number): Observable<Usuario>{
    return this.http.get<DataResult<Usuario>>(`${this.url}/usuarios/${id}`).pipe(
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

    return this.http.post<DataResult<Usuario>>(`${this.url}/usuarios`, "", {params: params}).pipe(tap({
      next:(data)=> {
        if(data.data===undefined) return
        this.created.next(data.data)
      }
    }))
  }

  edit_user(usuario: Usuario): Observable<any> {
    if (!usuario.id) {
      return throwError("Usuario sem id");
    }

    const params = new HttpParams()
    .append('name', usuario.name)
    .append('password', usuario.password);

    return this.http.put<DataResult<Usuario>>(`${this.url}/usuarios/${usuario.id}`, "", {params: params}).pipe(tap({
      next:(data)=> {
        if(data.data===undefined) return
        this.updated.next(data.data)
      }
    }));
  }

  remove(id : number): Observable<any>{
    return this.http.delete<DataResult<Usuario>>(`${this.url}/usuarios/${id}`).pipe(tap({
      next:(data)=> {
        if(data.data===undefined) return
        this.removed.next(data.data)
      }
    }));
  }


}
