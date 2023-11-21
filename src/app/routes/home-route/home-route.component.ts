import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/components/pedidos/models/pedido.model';
import { PedidosService } from 'src/app/components/pedidos/services/pedidos.service';
import { UsuariosService } from 'src/app/components/usuarios/services/usuarios.service';
import { Usuario } from 'src/app/components/usuarios/models/usuario.model';

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.css']
})
export class HomeRouteComponent implements OnInit {

  pedidos$: Observable<Pedido[]> | undefined;
  usuarios$: Observable<Usuario[]> | undefined;
  pedido_count$: number = 0;
  usuario_count$: number = 0;

  constructor(private _pedidosSrv: PedidosService, private _usuariosSrv: UsuariosService) {
    this.pedido_count$ = 0;
    this.usuario_count$ = 0;
  }

  ngOnInit(): void {
    this.pedidos$ = this._pedidosSrv.fetch();
    this.usuarios$ = this._usuariosSrv.fetch();

    this.pedidos$.subscribe(pedidos => {
      this.pedido_count$ = pedidos.length;
    });

    this.usuarios$.subscribe(usuarios => {
      this.usuario_count$ = usuarios.length;
    });
  }


}
