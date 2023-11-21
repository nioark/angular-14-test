import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { Observable } from 'rxjs';
import { Pedido } from '../../models/pedido.model';
import { PedidosService } from '../../services/pedidos.service';
import { PedidosAddComponent } from '../pedidos-add/pedidos-add.component';
import { PedidosEditComponent } from '../pedidos-edit/pedidos-edit.component';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss']
})
export class PedidosListComponent implements OnInit {

  pedidos$: Observable<Pedido[]> | undefined;

  constructor(public dialog: MatDialog, private _pedidosSrv: PedidosService) { }

  ngOnInit(): void {
    this.pedidos$ = this._pedidosSrv.fetch(); // Modify the method name to fetchPedidos()
  }

  create() {
    const dialogRef = this.dialog.open(PedidosAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  edit(id: number | undefined) {
    const dialogRef = this.dialog.open(PedidosEditComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  remove(id: number | undefined) {
    this._pedidosSrv.remove(id as number).subscribe((data: Pedido | undefined) => {
      console.log(data);
    });
  }

}
