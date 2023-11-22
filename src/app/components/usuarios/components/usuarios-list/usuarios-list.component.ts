import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map, merge, startWith , switchMap, withLatestFrom} from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosAddComponent } from '../usuarios-add/usuarios-add.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosEditComponent } from '../usuarios-edit/usuarios-edit.component';
import { UsuarioViewComponent } from '../usuario-view/usuario-view.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})


export class UsuariosListComponent implements OnInit {
  usuarios$?: Observable<Usuario[] | undefined>

  //usuarios$:Observable<Usuario[]> | undefined

  constructor(public dialog: MatDialog,private _usuariosSrv:UsuariosService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuarios$ = this._usuariosSrv.fetch().pipe(
      switchMap((usuarios) => merge(
        this._usuariosSrv.created.pipe(map((created) => ({ created }))),
        this._usuariosSrv.updated.pipe(map((updated) => ({ updated }))),
        this._usuariosSrv.removed.pipe(map((removed) => ({ removed })))
      ).pipe(
        startWith({}), // Necessário pra o usuarios$ ser inicializado
        map((data) => {
          const type = Object.keys(data)[0] as keyof typeof data;
          const usuarioEvent = data[type] as Usuario;

          switch (type) {
            case 'created':
              usuarios.unshift(usuarioEvent);
              break;
            case 'updated':
              const index = usuarios.findIndex(usuario => usuario.id === usuarioEvent.id);
              if (index !== -1)
                usuarios[index] = usuarioEvent;
              break;
            case 'removed':
              const index2 = usuarios.findIndex(usuario => usuario.id === usuarioEvent.id);
              if (index2 !== -1)
                usuarios.splice(index2, 1);
              break;
          }

          return usuarios;
        })
      ))
    );
  }

  create() {
    const dialogRef = this.dialog.open(UsuariosAddComponent);

    dialogRef.afterClosed().subscribe((result : {data:Usuario}) => {

      console.log(`Dialog result: ${result}`, result);
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
      this.openSnackBar("Usuario removido com sucesso!", "Fechar");
    },
    (error: any) => {
      this.openSnackBar("Erro ao remover usuário!", "Fechar");
      console.error(error);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  view(id: number | undefined){
    const dialogRef = this.dialog.open(UsuarioViewComponent, {
      data: id
    });;

  }

}
