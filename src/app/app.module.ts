import { Usuario } from './components/usuarios/models/usuario.model';
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
import { PedidosListComponent } from './components/pedidos/components/pedidos-list/pedidos-list.component';
import { PedidosAddComponent } from './components/pedidos/components/pedidos-add/pedidos-add.component';
import { PedidosEditComponent } from './components/pedidos/components/pedidos-edit/pedidos-edit.component';
import { UsuariosEditComponent } from './components/usuarios/components/usuarios-edit/usuarios-edit.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsuarioViewComponent } from './components/usuarios/components/usuario-view/usuario-view.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { PedidosRouteComponent } from './routes/pedidos-route/pedidos-route.component';
import { UsuariosRouteComponent } from './routes/usuarios-route/usuarios-route.component';
import { HomeRouteComponent } from './routes/home-route/home-route.component';



@NgModule({
  declarations: [
    AppComponent,
    UsuariosListComponent,
    UsuariosAddComponent,
    UsuariosEditComponent,
    UsuarioViewComponent,
    UsuariosRouteComponent,
    PedidosListComponent,
    PedidosAddComponent,
    PedidosEditComponent,
    PedidosRouteComponent,
    HomeRouteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
