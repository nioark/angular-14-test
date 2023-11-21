import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { NgModel } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios-add',
  templateUrl: './usuarios-add.component.html',
  styleUrls: ['./usuarios-add.component.scss']
})
export class UsuariosAddComponent implements OnInit {
username: any;

  constructor(private dialogRef: MatDialogRef<UsuariosAddComponent>, private _usuariosSrv: UsuariosService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  close(usuario?: Usuario): void {
    this.dialogRef.close(usuario);
  }

  add_user(username : string, password : string): void {
    const newUser = new Usuario(username, password);
    this._usuariosSrv.add_user(newUser).subscribe(
      (data: Usuario | undefined) => {
        this.close(data);
        this.openSnackBar("Usuario adicionado com sucesso!", "Fechar");
      },
      (error: any) => {
        this.openSnackBar("Erro ao adicionar usuário!", "Fechar");
        console.error(error);
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
