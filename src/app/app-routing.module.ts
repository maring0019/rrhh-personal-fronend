import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.component';
import { RoutingGuard, RoutingNavBar} from './app-guard';

const routes: Routes = [
  { path: 'inicio', component: LoginPage, canActivate: [RoutingNavBar] },

  // dejar siempre al último porque no encuentra las url después de esta
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
