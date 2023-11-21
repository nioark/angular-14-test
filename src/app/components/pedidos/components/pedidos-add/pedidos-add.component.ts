import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { Pedido } from '../../models/pedido.model';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Usuario } from '../../../usuarios/models/usuario.model';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';

@Component({
  selector: 'app-pedidos-add',
  templateUrl: './pedidos-add.component.html',
  styleUrls: ['./pedidos-add.component.scss']
})
export class PedidosAddComponent implements OnInit {
  formControl = new FormControl('');
  usuarios$:Observable<Usuario[]> | undefined;


  constructor(private dialogRef: MatDialogRef<PedidosAddComponent>, private _pedidosSrv: PedidosService,  private _usuariosSrv: UsuariosService, ) { }

  ngOnInit(): void {
    this.usuarios$ = this._usuariosSrv.fetch();

  }

  close(pedido?: Pedido): void {
    this.dialogRef.close(pedido);
  }

  add_pedido(name : string, quantidade : number, usuarioid : number): void {
    const newPedido = new Pedido(name, quantidade, usuarioid);

    this._pedidosSrv.add_pedido(newPedido).subscribe((data: Pedido | undefined) => {
      console.log(data);
      this.close(data);
    });
  }
}
