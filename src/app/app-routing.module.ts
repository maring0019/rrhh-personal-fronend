import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RoutingGuard, RoutingNavBar} from './app-guard';

// Components
import { AgenteRegistroComponent } from '../app/modules/agente/pages/registro/agente-registro.component';
import { AgenteSearchComponent } from './modules/agente/pages/search/agente-search.component';

import { AgenteCalendarComponent } from './pages/ausentismo/calendar/agente-calendar.component';
import { AusentismoSearchComponent } from './pages/ausentismo/ausencias/ausentismo-search.component';
import { AusentismoCargaComponent } from './pages/ausentismo/calendar/sidebar/carga/ausentismo-carga.component';


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




const routes: Routes = [
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


    // Agentes Busqueda y Registro
    { path: 'agentes/busqueda', component: AgenteSearchComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'agentes/registro', component: AgenteRegistroComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { path: 'agentes/registro/:id', component: AgenteRegistroComponent, canActivate: [RoutingNavBar , RoutingGuard] },
    { 
        path: 'agentes/:agenteId/ausencias',
        component: AgenteCalendarComponent,
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

                path: ':ausentismoId/editar',
                component: AusentismoCargaComponent,
                canActivate: [RoutingNavBar , RoutingGuard],
            },


        ]
        // http://localhost:4200/agentes/5cfea77d02890c22fcae4c9e/ausencias
        // component: AgenteAusentismoComponent,
        // canActivate: [RoutingNavBar , RoutingGuard],
        // runGuardsAndResolvers: 'always' 
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
    { path: '**', redirectTo: 'agentes/busqueda' }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
