import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RoutingGuard, RoutingNavBar} from './app-guard';
import { HomePage } from './pages/home/home.page';

const routes: Routes = [
  { path: 'login', component: LoginPage, canActivate: [RoutingNavBar] },

  { path: 'inicio', component: HomePage, canActivate: [RoutingNavBar, RoutingGuard] },

  // dejar siempre al último porque no encuentra las url después de esta
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
