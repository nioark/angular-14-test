import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { Pedido } from '../../models/pedido.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl } from '@angular/forms';
import { Usuario } from '../../../usuarios/models/usuario.model';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pedidos-edit',
  templateUrl: './pedidos-edit.component.html',
  styleUrls: ['./pedidos-edit.component.scss']
})
export class PedidosEditComponent implements OnInit {
  pedido$: Observable<Pedido> | undefined;

  constructor(private dialogRef: MatDialogRef<PedidosEditComponent>, private _pedidosSrv: PedidosService, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.pedido$ = this._pedidosSrv.get(this.data); // Modify the method name to fetchPedidos()
  }

  close(pedido?: Pedido): void {
    this.dialogRef.close(pedido);
  }

  edit_pedido(name : string, quantidade : number, usuarioid : number): void {
    const id = this.data
    console.log(usuarioid)
    const newPedido = new Pedido(name, usuarioid, quantidade, id);

    this._pedidosSrv.edit_pedido(newPedido).subscribe((data: Pedido | undefined) => {
      console.log(data);
      this.close(data);
      this.openSnackBar("Pedido editado com sucesso!", "Fechar");
    },
    (error: any) => {
      this.openSnackBar("Erro ao editar pedido!", "Fechar");
      console.error(error);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
