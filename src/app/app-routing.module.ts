import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosRouteComponent } from './routes/pedidos-route/pedidos-route.component';
import { UsuariosRouteComponent } from './routes/usuarios-route/usuarios-route.component';
import { HomeRouteComponent } from './routes/home-route/home-route.component';

const routes: Routes = [
  { path: '', component: HomeRouteComponent },
  { path: 'usuarios', component: UsuariosRouteComponent },
  { path: 'pedidos', component: PedidosRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
