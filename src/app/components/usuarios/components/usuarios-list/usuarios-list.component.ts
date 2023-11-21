import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosAddComponent } from '../usuarios-add/usuarios-add.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosEditComponent } from '../usuarios-edit/usuarios-edit.component';
import { UsuarioViewComponent } from '../usuario-view/usuario-view.component';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})


export class UsuariosListComponent implements OnInit {
  usuarios$:Observable<Usuario[]> | undefined

  constructor(public dialog: MatDialog,private _usuariosSrv:UsuariosService) { }

  ngOnInit(): void {
    this.usuarios$ = this._usuariosSrv.fetch()

  }

  create() {
    const dialogRef = this.dialog.open(UsuariosAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  edit(id: number | undefined) {
    const dialogRef = this.dialog.open(UsuariosEditComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  remove(id: number | undefined) {
    this._usuariosSrv.remove(id as number).subscribe((data: Usuario | undefined) => {
      console.log(data);
    });
  }

  view(id: number | undefined){
    const dialogRef = this.dialog.open(UsuarioViewComponent, {
      data: id
    });;

  }

}
