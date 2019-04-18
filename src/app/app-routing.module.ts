import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RoutingGuard, RoutingNavBar} from './app-guard';
import { HomePage } from './pages/home/home.page';
import { DetalleComponent } from './agentes/detalle/detalle.component';
import { EditPage } from './pages/edit/edit.page';

const routes: Routes = [
  { path: 'login', component: LoginPage, canActivate: [RoutingNavBar] },

  { path: 'inicio', component: HomePage, canActivate: [RoutingNavBar] },


  // Ruteos hijos
  { path: 'inicio/detalle/:id', component: DetalleComponent },

  { path: 'inicio/editar/:id', component: EditPage },

  // dejar siempre al último porque no encuentra las url después de esta
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
