import { Component, Inject, OnInit } from '@angular/core';
import { UsuariosListComponent } from '../usuarios-list/usuarios-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';
import { Observable } from 'rxjs';
import { Pedido } from '../../../pedidos/models/pedido.model';
import { Usuario } from '../../models/usuario.model';
import { PedidosService } from 'src/app/components/pedidos/services/pedidos.service';

@Component({
  selector: 'app-usuario-view',
  templateUrl: './usuario-view.component.html',
  styleUrls: ['./usuario-view.component.css']
})
export class UsuarioViewComponent implements OnInit {
  usuario$: Observable<Usuario> | undefined;
  pedidos$: Observable<Pedido[]> | undefined;

  constructor(private dialogRef: MatDialogRef<UsuariosListComponent>, private _pedidosSrv: PedidosService, private _usuariosSrv: UsuariosService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.usuario$ = this._usuariosSrv.get(this.data);
    this.pedidos$ = this._pedidosSrv.get_pedidos_from_user(this.data);
  }

}
