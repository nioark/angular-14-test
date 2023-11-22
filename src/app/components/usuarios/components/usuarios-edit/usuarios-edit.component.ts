import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { FormControl, NgModel } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss']
})
export class UsuariosEditComponent implements OnInit {
  usuario$: Observable<Usuario> | undefined;

  constructor(private dialogRef: MatDialogRef<UsuariosEditComponent>, private _usuariosSrv: UsuariosService, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    const id = this.data
    console.log(id)
    this.usuario$ = this._usuariosSrv.get(id); // Modify the method name to fetchPedidos()
  }

  close(usuario?: Usuario): void {
    this.dialogRef.close(usuario);
  }

  edit_user(username : string, password : string): void {
    const id = this.data
    const newUser = new Usuario(username, password, id);
    this._usuariosSrv.edit_user(newUser).subscribe((data: Usuario | undefined) => {
      this.close(data);
      this.openSnackBar("Usuario editado com sucesso!", "Fechar")
    },
    (error: any) => {
      this.openSnackBar("Erro ao editar usuário!", "Fechar");
      console.error(error);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
