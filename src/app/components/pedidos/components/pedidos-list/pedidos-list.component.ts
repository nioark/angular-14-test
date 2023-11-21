import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { Observable, combineLatest, map, startWith } from 'rxjs';
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
    this.pedidos$ = combineLatest({
      usuarios:this._pedidosSrv.fetch(),
      created:this._pedidosSrv.created.asObservable().pipe(startWith(null)),
      updated:this._pedidosSrv.updated.asObservable().pipe(startWith(null)),
      removed:this._pedidosSrv.removed.asObservable().pipe(startWith(null))
    }).pipe(map((data)=>{
      if(data?.created?.id) data.usuarios.unshift(data.created)
      
      if (data?.updated?.id) {
        const index = data.usuarios.findIndex(usuario => usuario.id === data.updated?.id);
        if (index !== -1) 
          data.usuarios[index] = data.updated;
      }

      if (data?.removed?.id) {
        const index = data.usuarios.findIndex(usuario => usuario.id === data.removed?.id);
        if (index !== -1) 
          data.usuarios.splice(index, 1);
      }

      return data.usuarios
    }))
  
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
