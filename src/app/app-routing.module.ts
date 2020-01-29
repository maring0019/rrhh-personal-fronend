import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RoutingGuard, RoutingNavBar} from './app-guard';

// Components
import { AgenteRegistroComponent } from '../app/modules/agente/pages/registro/agente-registro.component';
import { AgenteSearchComponent } from './modules/agente/pages/search/agente-search.component';

import { AusentismoSearchComponent } from './pages/ausentismo/search/ausentismo-search.component';
import { AusentismoCargaComponent } from './pages/ausentismo/create-update/ausentismo-carga.component';
import { AusentismoIndicadoresComponent } from './pages/ausentismo/indicadores/ausentismo-indicadores.component';


import { FeriadoListComponent } from './modules/tm/components/feriados/list/feriado-list.component';
import { FeriadoCreateComponent } from './modules/tm/components/feriados/create-update/feriado-create.component';
import { FeriadoUpdateComponent } from './modules/tm/components/feriados/create-update/feriado-update.component';

import { SituacionListComponent } from './modules/tm/components/situacion/list/situacion-list.component';
import { SituacionUpdateComponent } from './modules/tm/components/situacion/create-update/situacion-update.component';
import { SituacionCreateComponent } from './modules/tm/components/situacion/create-update/situacion-create.component';
import { ArticuloListComponent } from './modules/tm/components/articulo/list/articulo-list.component';
import { ArticuloCreateComponent } from './modules/tm/components/articulo/create-update/articulo-create.component';
import { ArticuloUpdateComponent } from './modules/tm/components/articulo/create-update/articulo-update.component';

import { ReporteSearchComponent } from './pages/reportes/reporte-search.component';

import { ParteListComponent } from './pages/partes/parte/list/parte-list.component';
import { ParteAgenteListComponent } from 'src/app/pages/partes/parte-agente/list/parte-agente-list.component';
import { ParteAgenteListViewComponent } from 'src/app/pages/partes/parte-agente/list-view/parte-agente-list-view.component';
import { ParteReporteListComponent } from './pages/partes/reportes/partes/reporte-parte-list.component';
import { FichadaReporteListComponent } from 'src/app/pages/partes/reportes/fichadas/reporte-fichada-list.component';

import { GuardiaCreateUpdateComponent } from './pages/guardias/guardia-servicio/create-update/guardia-create-update.component';
import { GuardiaListComponent } from 'src/app/pages/guardias/guardia-servicio/list/guardia-list.component';
import { HomePageComponent } from 'src/app/pages/home/home.page';
import { AgenteAusentismoComponent } from './pages/ausentismo/agente-ausentismo.component';

const routes: Routes = [
    // Inicio
    { path: 'inicio', component: HomePageComponent, canActivate: [RoutingNavBar , RoutingGuard] },

    // Tablas maestras
    { path: 'tm/articulos', component: ArticuloListComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'tm/articulos/crear', component: ArticuloCreateComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'tm/articulos/editar/:id', component: ArticuloUpdateComponent, canActivate: [RoutingNavBar , RoutingGuard] },

    { path: 'tm/situaciones', component: SituacionListComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'tm/situaciones/crear', component: SituacionCreateComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'tm/situaciones/editar/:id', component: SituacionUpdateComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    
    { path: 'tm/feriados', component: FeriadoListComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'tm/feriados/crear', component: FeriadoCreateComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'tm/feriados/editar/:id', component: FeriadoUpdateComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    
    // Reportes
    { path: 'reportes', component: ReporteSearchComponent, canActivate: [RoutingNavBar , RoutingGuard] },

    // Partes
    { path: 'partes', component: ParteListComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'partes/:id/agentes', component: ParteAgenteListViewComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'partes/agentes', component: ParteAgenteListComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'partes/reportes/partes', component: ParteReporteListComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'partes/reportes/fichadas', component: FichadaReporteListComponent, canActivate: [RoutingNavBar , RoutingGuard] },

     // Guardias
     { path: 'guardias', component: GuardiaListComponent, canActivate: [RoutingNavBar , RoutingGuard] },
     { path: 'guardias/crear', component: GuardiaCreateUpdateComponent, canActivate: [RoutingNavBar , RoutingGuard] },
     { path: 'guardias/editar/:id', component: GuardiaCreateUpdateComponent, canActivate: [RoutingNavBar , RoutingGuard] },
     { path: 'guardias/validar/:id', component: GuardiaCreateUpdateComponent, canActivate: [RoutingNavBar , RoutingGuard] },


    // Agentes Busqueda y Registro
    { path: 'agentes', component: AgenteSearchComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'agentes/registro', component: AgenteRegistroComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'agentes/registro/:id', component: AgenteRegistroComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { 
        path: 'agentes/:agenteId/ausencias',
        component: AgenteAusentismoComponent,
        children: [
            {
                path: '',
                redirectTo: 'listado',
                pathMatch: 'full'
            },
            {
                path: 'listado',
                component: AusentismoSearchComponent,
                canActivate: [RoutingNavBar , RoutingGuard],
            },
            {
                path: 'agregar',
                component: AusentismoCargaComponent,
                canActivate: [RoutingNavBar , RoutingGuard],
            },
            {
                path: 'indicadores',
                component: AusentismoIndicadoresComponent,
                canActivate: [RoutingNavBar , RoutingGuard],
            },
            {

                path: ':ausentismoId/editar',
                component: AusentismoCargaComponent,
                canActivate: [RoutingNavBar , RoutingGuard],
            },


        ]
    },

    { path: 'login', component: LoginPage, canActivate: [RoutingNavBar] },


    // Ruteos hijos
    // { path: 'inicio', component: HomePage,
    //     canActivate: [RoutingNavBar , RoutingGuard],
    //     children: [
    //         { path: '', component: ListadoComponent },
    //         { path: 'detalle/:id', component: DetalleComponent },
    //     ] 
    // },
    
        // dejar siempre al último porque no encuentra las url después de esta
    { path: '**', redirectTo: 'inicio' }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
