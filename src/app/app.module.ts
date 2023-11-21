import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosListComponent } from './components/usuarios/components/usuarios-list/usuarios-list.component';
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { UsuariosAddComponent } from './components/usuarios/components/usuarios-add/usuarios-add.component';
import { PedidosListComponent } from './components/usuarios/components/pedidos-list/pedidos-list.component';
import { PedidosAddComponent } from './components/usuarios/components/pedidos-add/pedidos-add.component';
import { PedidosEditComponent } from './components/usuarios/components/pedidos-edit/pedidos-edit.component';
import { UsuariosEditComponent } from './components/usuarios/components/usuarios-edit/usuarios-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosListComponent,
    UsuariosAddComponent,
    UsuariosEditComponent,
    PedidosListComponent,
    PedidosAddComponent,
    PedidosEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
