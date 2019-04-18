import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RoutingGuard, RoutingNavBar} from './app-guard';
import { HomePage } from './pages/home/home.page';
import { DetalleComponent } from './componentes/detalle/detalle.component';

// Components
import { ListSituacionComponent } from '../app/modules/tm/components/situacion/list-situacion/list-situacion.component';
import { AgenteRegistroComponent } from '../app/modules/agente/pages/registro/agente-registro.component';

const routes: Routes = [
    // Tablas maestras
    { path: 'tm/situacion', component: ListSituacionComponent, canActivate: [RoutingNavBar] },
    { path: 'agentes/registro', component: AgenteRegistroComponent, canActivate: [RoutingNavBar] },

    { path: 'login', component: LoginPage, canActivate: [RoutingNavBar] },
    { path: 'inicio', component: HomePage, canActivate: [RoutingNavBar] },


    // Ruteos hijos
    { path: 'inicio/detalle/:id', component: DetalleComponent },

    
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
