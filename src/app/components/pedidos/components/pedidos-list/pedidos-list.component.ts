import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { Observable, combineLatest, map, merge, of, race, startWith, switchMap } from 'rxjs';
import { Pedido } from '../../models/pedido.model';
import { PedidosService } from '../../services/pedidos.service';
import { PedidosAddComponent } from '../pedidos-add/pedidos-add.component';
import { PedidosEditComponent } from '../pedidos-edit/pedidos-edit.component';
import {MatTableModule} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss']
})
export class PedidosListComponent implements OnInit {

  pedidos$: Observable<Pedido[]> | undefined;

  constructor(public dialog: MatDialog, private _pedidosSrv: PedidosService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.pedidos$ = this._pedidosSrv.fetch().pipe(
      switchMap((pedidos) => merge(
        this._pedidosSrv.created.pipe(map((created) => ({ created }))),
        this._pedidosSrv.updated.pipe(map((updated) => ({ updated }))),
        this._pedidosSrv.removed.pipe(map((removed) => ({ removed })))
      ).pipe(
        startWith({}), // Necessário pra o pedidos$ ser inicializado
        map((data) => {
          const type = Object.keys(data)[0] as keyof typeof data;
          const pedidoEvent = data[type] as Pedido;

          switch (type) {
            case 'created':
              pedidos.unshift(pedidoEvent);
              break;
            case 'updated':
              const index = pedidos.findIndex(pedido => pedido.id === pedidoEvent.id);
              if (index !== -1)
                pedidos[index] = pedidoEvent;
              break;
            case 'removed':
              const index2 = pedidos.findIndex(pedido => pedido.id === pedidoEvent.id);
              if (index2 !== -1)
                pedidos.splice(index2, 1);
              break;
          }

          return pedidos;
        })
      ))
    );
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
      this.openSnackBar("Pedido removido com sucesso!", "Fechar");
    },
    (error: any) => {
      this.openSnackBar("Erro ao remover pedido!", "Fechar");
      console.error(error);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
