import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Type } from '@angular/core';

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
import { FilesService } from './services/files.service';
import { CalendarRangeSelectorService } from './services/calendar-range-selector.service';
import { DescargasService } from './services/descargas.service';
import { FeriadoService } from './services/feriado.service';
import { EventosCalendarService } from './services/eventos.calendar.service';
import { FrancoService } from './services/franco.service';
import { CausaBajaService } from './services/causa-baja.service';
import { ReportesService } from './services/reportes.service';
import { ParteService } from './services/parte.service';
import { ParteEstadoService } from './services/parte-estado.service';
import { ParteAgenteService } from './services/parte-agente.service';
import { ParteJustificacionService } from './services/parte-justificacion.service';
import { UbicacionService } from './services/ubicacion.service';
import { GuardiaService } from './services/guardia.service';
import { GuardiaPeriodoService } from './services/guardia-periodo.service';
import { GuardiaLoteService } from './services/guardia-lote.service';
import { MenuService } from './services/menu.service';

// Stores
import { CalendarStoreService } from './stores/calendar.store.service';

// Pages
import { LoginPage } from './pages/login/login.page';
import { ConfiguracionMenuPageComponent } from './pages/home/configuracion-menu.page';
import { HomeMenuPageComponent } from './pages/home/home-menu.page';

import { RoutingGuard, RoutingNavBar} from './app-guard';

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
import { AgenteDatosGeneralesComponent } from './modules/agente/pages/registro/datos-historia-laboral/datos-generales/agente-datos-generales.component';
import { AgenteDatosNormaLegalComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-norma-legal/agente-datos-norma-legal.component';


// Busqueda Agente
import { AgenteSearchComponent } from './modules/agente/pages/search/agente-search.component';
import { AgenteSearchFormComponent } from './modules/agente/pages/search/search-form/agente-search-form.component';
import { SearchLeyendaComponent } from './modules/agente/components/search-leyenda/search-leyenda.component';
import { AgenteItemListadoComponent } from './modules/agente/pages/search/item-listado/agente-item-listado.component';

// Agente Detalle
import { AgenteFotoComponent } from './modules/agente/components/imagen-foto/agente-foto.component';
import { AgenteDetalleComponent } from './modules/agente/components/agente-detalle/agente-detalle.component';

// Agente Baja/Reactivar
import { AgenteBajaComponent } from 'src/app/modules/agente/components/agente-baja/agente-baja.component';
import { AgenteReactivarComponent } from './modules/agente/components/agente-reactivar/agente-reactivar.component';

// Agente Historia Laboral
import { HistoriaLaboralCreateComponent } from './modules/agente/components/agente-historia-laboral/historia-laboral-create.component';

// Otros
import { AgenteFormSelectComponent } from './modules/agente/components/agente-form-select/agente-form-select.component';
import { UbicaciónFormSelectComponent } from './components/forms/ubicacion-form-select/ubicacion-form-select.component';

// Ausentismo
import { AgenteAusentismoComponent } from './pages/ausentismo/agente-ausentismo.component';
import { AgenteCalendarComponent } from './pages/ausentismo/calendar/agente-calendar.component';
import { MainCalendarComponent } from './pages/ausentismo/calendar/main/main-calendar.component';
import { NavCalendarComponent } from './pages/ausentismo/calendar/nav/nav-calendar.component';
import { HeadCalendarComponent } from './pages/ausentismo/calendar/header/header-calendar.component';

import { AusentismoCargaComponent } from './pages/ausentismo/create-update/ausentismo-carga.component';
import { AusentismoCargaAddComponent } from './pages/ausentismo/create-update/create/ausentismo-carga-add.component';
import { AusentismoCargaUpdateComponent } from './pages/ausentismo/create-update/update/ausentismo-carga-update.component';
import { AusentismoCargaFormComponent } from './pages/ausentismo/create-update/form/ausentismo-form.component';
import { AusentismoSearchComponent } from './pages/ausentismo/search/ausentismo-search.component';
import { AusentismoListadoComponent } from './pages/ausentismo/search/item-listado/ausentismo-listado.component';
import { AusentismoSearchFormComponent } from './pages/ausentismo/search/search-form/ausentismo-search-form.component';
import { AusentismoIndicadoresComponent } from './pages/ausentismo/indicadores/ausentismo-indicadores.component';
import { IndicadorLicenciasDetalleComponent } from './pages/ausentismo/indicadores/licencias-detalle/indicador-licencias-detalle.component';
import { IndicadorLicenciasComponent } from './pages/ausentismo/indicadores/licencias/indicador-licencias.componente';


// Componentes Generales
import { ListadoComponent } from './componentes/listado/listado.component';
import { ItemListadoComponent } from './componentes/listado/item-listado/item-listado.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { TabsComponent } from './componentes/tabs/tabs.component';
import { TabContactoComponent } from './componentes/tabs/tab-contacto/tab-contacto.component';
import { EdicionComponent } from './componentes/edicion/edicion.component';
import { UploaderStatusComponent } from './components/file-manager/uploader.status.component';
import { FileManagerComponent } from './components/file-manager/file.manager.component';
import { LogoSvgComponent } from './styles/logo.svg';
import { AcronimoSvgComponent } from './styles/acronimo.svg';
import { BlockMenuComponent } from 'src/app/components/menu/block-menu.component';


// Pipes
import { FechaPipe } from './pipes/fecha.pipe';
import { TitlePipe } from './pipes/title.pipe';
import { EdadPipe } from './pipes/edad.pipe';
import { SanitizeHtmlPipe } from './pipes/html.pipe';

import { ContextMenuComponent } from './components/context-menu/context-menu.component';

import { AgenteMockService } from './hardcodeo/agente.service'
import { ModalComponent } from './components/modal/modal.component';
import { LeyendaComponent } from './components/leyenda/leyenda.component';

// Plex
import { DPlexItemComponent } from 'src/app/components/item-list/item.component';
import { DPlexHeadingComponent } from 'src/app/components/item-list/heading.component';
import { DPlexListComponent } from 'src/app/components/item-list/list.component';


import { FeriadoSearchFormComponent } from './modules/tm/components/feriados/list/search/feriado-search.component';
import { FeriadoItemListComponent } from './modules/tm/components/feriados/list/item/feriado-item-list.component';
import { FeriadoListComponent } from './modules/tm/components/feriados/list/feriado-list.component';
import { SituacionListComponent } from './modules/tm/components/situacion/list/situacion-list.component';
import { SituacionItemListComponent } from './modules/tm/components/situacion/list/item/situacion-item-list.component';
import { SituacionSearchFormComponent } from './modules/tm/components/situacion/list/search/situacion-search.component';

import { FeriadoCreateComponent } from './modules/tm/components/feriados/create-update/feriado-create.component';
import { FeriadoCreateFormComponent } from './modules/tm/components/feriados/create-update/form/feriado-create-form.component';
import { FeriadoUpdateComponent } from './modules/tm/components/feriados/create-update/feriado-update.component';
import { FeriadoUpdateFormComponent } from './modules/tm/components/feriados/create-update/form/feriado-update-form.component';

import { SituacionCreateComponent } from './modules/tm/components/situacion/create-update/situacion-create.component';
import { SituacionCreateFormComponent } from './modules/tm/components/situacion/create-update/form/situacion-create-form.component';
import { SituacionUpdateComponent } from './modules/tm/components/situacion/create-update/situacion-update.component';
import { SituacionUpdateFormComponent } from './modules/tm/components/situacion/create-update/form/situacion-update-form.component';

import { ArticuloItemListComponent } from './modules/tm/components/articulo/list/item/articulo-item-list.component';
import { ArticuloSearchFormComponent } from './modules/tm/components/articulo/list/search/articulo-search.component';
import { ArticuloListComponent } from './modules/tm/components/articulo/list/articulo-list.component';
import { ArticuloCreateComponent } from './modules/tm/components/articulo/create-update/articulo-create.component';
import { ArticuloCreateFormComponent } from './modules/tm/components/articulo/create-update/form/articulo-create-form.component';
import { ArticuloUpdateComponent } from './modules/tm/components/articulo/create-update/articulo-update.component';
import { ArticuloUpdateFormComponent } from './modules/tm/components/articulo/create-update/form/articulo-update-form.component';

import { ReporteSearchComponent } from './pages/reportes/reporte-search.component';
import { ReporteAgenteFiltersComponent } from './pages/reportes/forms/reporte-agente-filters.component';
import { ReporteSeleccionTipoComponent } from './pages/reportes/forms/reporte-seleccion-tipo.component';


import { ParteListComponent } from './pages/partes/parte/list/parte-list.component';
import { ParteItemListComponent } from './pages/partes/parte/list/item/parte-item-list.component';
import { ParteSearchFormComponent } from './pages/partes/parte/list/search/parte-search.component';
import { ParteAgenteSearchFormComponent } from 'src/app/pages/partes/parte-agente/list/search/parte-agente-search.component';
import { ParteAgenteItemListComponent } from 'src/app/pages/partes/parte-agente/list/item/parte-agente-item-list.component';
import { ParteAgenteListComponent } from 'src/app/pages/partes/parte-agente/list/parte-agente-list.component';
import { ParteAgenteListViewComponent } from 'src/app/pages/partes/parte-agente/list-view/parte-agente-list-view.component';
import { ParteReporteListComponent } from './pages/partes/reportes/partes/reporte-parte-list.component';
import { ParteReporteSearchFormComponent } from './pages/partes/reportes/partes/search/parte-reporte-search.component';
import { ParteReporteItemListComponent } from './pages/partes/reportes/partes/item/parte-reporte-item-list.component';
import { FichadaReporteItemListComponent } from 'src/app/pages/partes/reportes/fichadas/item/fichada-reporte-item-list.component';
import { FichadaReporteSearchFormComponent } from 'src/app/pages/partes/reportes/fichadas/search/fichada-reporte-search.component';
import { FichadaReporteListComponent } from './pages/partes/reportes/fichadas/reporte-fichada-list.component';

// Guardias
import { GuardiaCreateUpdateComponent } from './pages/guardias/guardia-servicio/create-update/guardia-create-update.component';
import { GuardiaFormComponent } from './pages/guardias/guardia-servicio/create-update/form/guardia-form.component';
import { GuardiaPlanillaComponent } from './pages/guardias/guardia-servicio/create-update/planilla/guardia-planilla.component';
import { GuardiaListComponent } from 'src/app/pages/guardias/guardia-servicio/list/guardia-list.component';
import { GuardiaItemListComponent } from 'src/app/pages/guardias/guardia-servicio/list/item/guardia-item-list.component';
import { GuardiaSearchFormComponent } from 'src/app/pages/guardias/guardia-servicio/list/search/guardia-search-form.component';
import { RangeDirective } from './directives/range';
import { AgenteSelectComponent } from 'src/app/modules/agente/components/agente-select/agente-select.component';
import { AgenteSelectSearchFormComponent } from 'src/app/modules/agente/components/agente-select/search/agente-select-search-form.component';


const ADMIN_COMPONENTS = [

    FeriadoListComponent,
    FeriadoSearchFormComponent,
    FeriadoItemListComponent,
    FeriadoCreateComponent,
    FeriadoCreateFormComponent,
    FeriadoUpdateComponent,
    FeriadoUpdateFormComponent,
    
    SituacionListComponent,
    SituacionSearchFormComponent,
    SituacionItemListComponent,
    SituacionCreateComponent,
    SituacionCreateFormComponent,
    SituacionUpdateComponent,
    SituacionUpdateFormComponent,
    
    ArticuloListComponent,
    ArticuloSearchFormComponent,
    ArticuloItemListComponent,
    ArticuloCreateComponent,
    ArticuloCreateFormComponent,
    ArticuloUpdateComponent,
    ArticuloUpdateFormComponent,
  ]

@NgModule({
    declarations: [
        AppComponent,
        LoginPage,
        HomeMenuPageComponent,
        ConfiguracionMenuPageComponent,

        AgenteRegistroComponent,
        AgenteDatosBasicosComponent,
        AgenteDatosDireccionComponent,
        AgenteDatosContactoComponent,
        AgenteDatosEducacionComponent,
        AgenteDatosHistoriaLaboralComponent,
        AgenteDatosGeneralesComponent,
        AgenteDatosCargoComponent,
        AgenteDatosSituacionComponent,
        AgenteDatosRegimenComponent,
        AgenteDatosNormaLegalComponent,

        HistoriaLaboralCreateComponent,
        
        AgenteSearchComponent,
        AgenteSearchFormComponent,
        AgenteFotoComponent,
        AgenteItemListadoComponent,
        AgenteDetalleComponent,
        AgenteBajaComponent,
        AgenteReactivarComponent,
        AgenteFormSelectComponent,
        AgenteSelectSearchFormComponent,
        AgenteSelectComponent,
        
        AgenteAusentismoComponent,
        AgenteCalendarComponent,
        MainCalendarComponent,
        NavCalendarComponent,
        HeadCalendarComponent,
        AusentismoCargaComponent,
        AusentismoCargaAddComponent,
        AusentismoCargaUpdateComponent,
        AusentismoCargaFormComponent,
        AusentismoListadoComponent,
        AusentismoSearchFormComponent,
        AusentismoSearchComponent,
        AusentismoIndicadoresComponent,
        IndicadorLicenciasComponent,
        IndicadorLicenciasDetalleComponent,
        
        // Partes
        ParteListComponent,
        ParteItemListComponent,
        ParteSearchFormComponent,
        ParteAgenteListComponent,
        ParteAgenteListViewComponent,
        ParteAgenteItemListComponent,
        ParteAgenteSearchFormComponent,
        ParteReporteItemListComponent,
        ParteReporteSearchFormComponent,
        ParteReporteListComponent,
        FichadaReporteSearchFormComponent,
        FichadaReporteItemListComponent, 
        FichadaReporteListComponent,

        // Guardias
        GuardiaCreateUpdateComponent,
        GuardiaFormComponent,
        GuardiaPlanillaComponent,
        GuardiaListComponent,
        GuardiaItemListComponent,
        GuardiaSearchFormComponent,

        SearchLeyendaComponent,
        ListadoComponent,
        ItemListadoComponent,
        BuscadorComponent,
        DetalleComponent,
        TabsComponent,
        TabContactoComponent,
        EdicionComponent,
        FileManagerComponent,
        UploaderStatusComponent,
        ModalComponent,
        ContextMenuComponent,
        UbicaciónFormSelectComponent,
        LeyendaComponent,
        BlockMenuComponent,
        // Tablas Maestras,
        ...ADMIN_COMPONENTS,

        // Plex
        DPlexListComponent,
        DPlexItemComponent,
        DPlexHeadingComponent,

        // Reportes
        ReporteSearchComponent,
        ReporteAgenteFiltersComponent,
        ReporteSeleccionTipoComponent,
        
        // Pipes
        FechaPipe,
        TitlePipe,
        EdadPipe,
        SanitizeHtmlPipe,

        // Directives
        RangeDirective,

        LogoSvgComponent,
        AcronimoSvgComponent
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
        FeriadoService,
        FrancoService,
        EventosCalendarService,
        FilesService,
        CalendarRangeSelectorService,
        DescargasService,
        CalendarStoreService,
        CausaBajaService,
        ReportesService,
        ParteService,
        ParteEstadoService,
        ParteJustificacionService,
        UbicacionService,
        GuardiaService,
        GuardiaPeriodoService,
        GuardiaLoteService,
        ParteAgenteService,
        MenuService
        
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        UploaderStatusComponent,
        ParteItemListComponent,
        ParteSearchFormComponent,
        ParteAgenteItemListComponent,
        ParteAgenteSearchFormComponent,
        ParteReporteItemListComponent,
        ParteReporteSearchFormComponent,
        FichadaReporteSearchFormComponent,
        FichadaReporteItemListComponent,
        GuardiaItemListComponent,
        GuardiaSearchFormComponent,
        ...ADMIN_COMPONENTS]
})
export class AppModule { }
