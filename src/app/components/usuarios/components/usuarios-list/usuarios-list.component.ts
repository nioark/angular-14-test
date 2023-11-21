import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map, startWith , switchMap, withLatestFrom} from 'rxjs';
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
  switchMap(
    (usuarios) => combineLatest({
      created:this._usuariosSrv.created.pipe(startWith(null)),
      updated:this._usuariosSrv.updated.pipe(startWith(null)),
      removed:this._usuariosSrv.removed.pipe(startWith(null))
    }).pipe(map((data)=>{
      console.log("Objeto: ", data)
      if(data?.created?.id) {
        usuarios.unshift(data.created)
      }

      if (data?.updated?.id) {
        const index = usuarios.findIndex(usuario => usuario.id === data.updated?.id);
        if (index !== -1)
          usuarios[index] = data.updated;
      }

      if (data?.removed?.id) {
        const index = usuarios.findIndex(usuario => usuario.id === data.removed?.id);
        console.log("Removed: ",usuarios, index)
        if (index !== -1)
          usuarios.splice(index, 1);

        console.log("Removed after: ",usuarios, index)

      }

      return usuarios
    }))
  )
)


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
