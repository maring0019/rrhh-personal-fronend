import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PlexModule } from '@andes/plex';
import { Plex } from '@andes/plex';
import { Server } from '@andes/shared';
import { AuthModule } from '@andes/auth';
import { Auth } from '@andes/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { FullCalendarModule } from '@fullcalendar/angular';

// Servicios
import { TipoSituacionService } from './services/tm/situacion.service';
import { AgenteService } from './services/agente.service';
import { LocalidadService } from './services/localidad.service';
import { ProvinciaService } from './services/provincia.service';
import { PaisService } from './services/pais.service';
import { TipoNormaLegalService } from './services/tipo-norma-legal.service';
import { EducacionService } from './services/educacion.service';
import { ServicioService } from './services/servicio.service';
import { AgrupamientoService } from './services/agrupamiento.service';
import { PuestoService } from './services/puesto.service';
import { SubPuestoService } from './services/subpuesto.service';
import { SectorService } from './services/sector.service';
import { RegimenHorarioService } from './services/regimen-horario.service';
import { ArticuloService } from './services/articulo.service';
import { AusentismoService } from './services/ausentismo.service';
import { UploadService } from './services/upload.service';

// Pages
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';

import { RoutingGuard, RoutingNavBar} from './app-guard';


import { ListTipoSituacionComponent } from './modules/tm/components/situacion/list-situacion/list-situacion.component';
import { CreateUpdateTipoSituacionComponent } from './modules/tm/components/situacion/create-update-situacion/create-update-situacion.component';

// ABM Agente
import { AgenteRegistroComponent } from './modules/agente/pages/registro/agente-registro.component';
import { AgenteDatosBasicosComponent } from './modules/agente/pages/registro/datos-basicos/agente-datos-basicos.component';
import { AgenteDatosDireccionComponent } from './modules/agente/pages/registro/datos-contacto/agente-datos-direccion.component';
import { AgenteDatosContactoComponent } from './modules/agente/pages/registro/datos-contacto/agente-datos-contacto.component';
import { AgenteDatosEducacionComponent } from './modules/agente/pages/registro/datos-educacion/agente-datos-educacion.component';
import { AgenteDatosHistoriaLaboralComponent } from './modules/agente/pages/registro/datos-historia-laboral/agente-datos-historia-laboral.component';
import { AgenteDatosCargoComponent } from './modules/agente/pages/registro/datos-historia-laboral/datos-cargo/agente-datos-cargo.component';
import { AgenteDatosSituacionComponent } from './modules/agente/pages/registro/datos-historia-laboral/datos-situacion/agente-datos-situacion.component';
import { AgenteDatosRegimenComponent } from './modules/agente/pages/registro/datos-historia-laboral/datos-regimen/agente-datos-regimen.component';

// Busqueda Agente
import { AgenteSearchComponent } from './modules/agente/pages/search/agente-search.component';
import { AgenteSearchFormComponent } from './modules/agente/pages/search/search-form/agente-search-form.component';
import { SearchLeyendaComponent } from './modules/agente/components/search-leyenda/search-leyenda.component';
import { AgenteListadoComponent } from './modules/agente/pages/search/agente-listado/agente-listado.component';
import { AgenteItemListadoComponent } from './modules/agente/pages/search/item-listado/agente-item-listado.component';

// Agente Detalle
import { AgenteFotoComponent } from './modules/agente/components/imagen-foto/agente-foto.component';
import { AgenteDetalleComponent } from './modules/agente/components/agente-detalle/agente-detalle.component';

// Ausentismo
import { AgenteAusentismoComponent } from './pages/ausentismo/agente-ausentismo.component';
import { AgenteCalendarComponent } from './pages/ausentismo/calendar/agente-calendar.component';
import { MainCalendarComponent } from './pages/ausentismo/calendar/main/main-calendar.component';
import { NavCalendarComponent } from './pages/ausentismo/calendar/nav/nav-calendar.component';
import { HeadCalendarComponent } from './pages/ausentismo/calendar/header/header-calendar.component';
import { SidebarCalendarComponent } from './pages/ausentismo/calendar/sidebar/sidebar-calendar.component';
import { UploaderStatusComponent } from './pages/ausentismo/calendar/sidebar/carga/uploader.status.component';
import { FileManagerComponent } from './pages/ausentismo/calendar/sidebar/carga/file.manager.component';

import { AusentismoCargaComponent } from './pages/ausentismo/calendar/sidebar/carga/ausentismo-carga.component';
import { AusenciasListadoComponent } from './pages/ausentismo/ausencias/item-listado/ausencias-listado.component';
import { AusenciasSearchFormComponent } from './pages/ausentismo/ausencias/search-form/ausencias-search-form.component';
import { AusenciasSearchComponent } from './pages/ausentismo/ausencias/ausencias-search.component';

// Componentes
import { ListadoComponent } from './componentes/listado/listado.component';
import { ItemListadoComponent } from './componentes/listado/item-listado/item-listado.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { TabsComponent } from './componentes/tabs/tabs.component';
import { TabContactoComponent } from './componentes/tabs/tab-contacto/tab-contacto.component';
import { EdicionComponent } from './componentes/edicion/edicion.component';

// Pipes
import { FechaPipe } from './pipes/fecha.pipe';
import { TitlePipe } from './pipes/title.pipe';
import { EdadPipe } from './pipes/edad.pipe';


import { AgenteMockService } from './hardcodeo/agente.service';


@NgModule({
    declarations: [
        AppComponent,
        LoginPage,
        HomePage,
        ListTipoSituacionComponent,
        CreateUpdateTipoSituacionComponent,

        AgenteRegistroComponent,
        AgenteDatosBasicosComponent,
        AgenteDatosDireccionComponent,
        AgenteDatosContactoComponent,
        AgenteDatosEducacionComponent,
        AgenteDatosHistoriaLaboralComponent,
        AgenteDatosCargoComponent,
        AgenteDatosSituacionComponent,
        AgenteDatosRegimenComponent,
        
        AgenteSearchComponent,
        AgenteSearchFormComponent,
        AgenteFotoComponent,
        SearchLeyendaComponent,

        AgenteListadoComponent,
        AgenteItemListadoComponent,
        AgenteDetalleComponent,
        
        AgenteAusentismoComponent,
        AgenteCalendarComponent,
        MainCalendarComponent,
        NavCalendarComponent,
        HeadCalendarComponent,
        SidebarCalendarComponent,
        AusentismoCargaComponent,
        AusenciasListadoComponent,
        AusenciasSearchFormComponent,
        AusenciasSearchComponent,

        ListadoComponent,
        ItemListadoComponent,
        BuscadorComponent,
        DetalleComponent,
        TabsComponent,
        TabContactoComponent,
        EdicionComponent,
        FileManagerComponent,
        UploaderStatusComponent,

        // Pipes
        FechaPipe,
        TitlePipe,
        EdadPipe
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        AppRoutingModule,

        PlexModule,
        AuthModule,

        FullCalendarModule
    ],
    providers: [
        Plex,
        Server,
        Auth,
        RoutingGuard,
        RoutingNavBar,
        TipoSituacionService,
        AgenteMockService,
        // {provide: AgenteService, useClass: AgenteMockService },
        AgenteService,
        ProvinciaService,
        LocalidadService,
        PaisService,
        EducacionService,
        TipoNormaLegalService,
        ServicioService,
        AgrupamientoService,
        PuestoService,
        SubPuestoService,
        SectorService,
        RegimenHorarioService,
        ArticuloService,
        AusentismoService,
        UploadService
    ],
    bootstrap: [AppComponent],
    entryComponents: [UploaderStatusComponent]
})
export class AppModule { }
