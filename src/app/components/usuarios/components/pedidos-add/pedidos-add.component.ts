import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { Pedido } from '../../models/pedido.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pedidos-add',
  templateUrl: './pedidos-add.component.html',
  styleUrls: ['./pedidos-add.component.scss']
})
export class PedidosAddComponent implements OnInit {


  constructor(private dialogRef: MatDialogRef<PedidosAddComponent>, private _pedidosSrv: PedidosService) { }

  ngOnInit(): void {
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
