import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-usuarios-add',
  templateUrl: './usuarios-add.component.html',
  styleUrls: ['./usuarios-add.component.scss']
})
export class UsuariosAddComponent implements OnInit {
username: any;

  constructor(private dialogRef: MatDialogRef<UsuariosAddComponent>, private _usuariosSrv: UsuariosService) { }

  ngOnInit(): void {
  }

  close(usuario?: Usuario): void {
    this.dialogRef.close(usuario);
  }

  add_user(username : string, password : string): void {
    const newUser = new Usuario(username, password);
    
    this._usuariosSrv.add_user(newUser).subscribe((data: Usuario | undefined) => {
      console.log(data);
      this.close(data);
    });
  }
}
