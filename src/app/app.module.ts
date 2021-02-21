import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Type } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { PlexModule } from "@andes/plex";
import { Plex } from "@andes/plex";
import { Server } from "@andes/shared";
import { AuthModule } from "@andes/auth";
// import { Auth } from '@andes/auth';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";

import { FullCalendarModule } from "@fullcalendar/angular";
import { NgxPermissionsModule } from "ngx-permissions";

// Servicios
import { TipoSituacionService } from "./services/tm/situacion.service";
import { AgenteService } from "./services/agente.service";
import { LocalidadService } from "./services/localidad.service";
import { ProvinciaService } from "./services/provincia.service";
import { PaisService } from "./services/pais.service";
import { TipoNormaLegalService } from "./services/tipo-norma-legal.service";
import { EducacionService } from "./services/educacion.service";
import { ServicioService } from "./services/servicio.service";
import { AgrupamientoService } from "./services/agrupamiento.service";
import { PuestoService } from "./services/puesto.service";
import { SubPuestoService } from "./services/subpuesto.service";
import { SectorService } from "./services/sector.service";
import { RegimenHorarioService } from "./services/regimen-horario.service";
import { ArticuloService } from "./services/articulo.service";
import { AusentismoService } from "./services/ausentismo.service";
import { FilesService } from "./services/files.service";
import { CalendarRangeSelectorService } from "./services/calendar-range-selector.service";
import { DescargasService } from "./services/descargas.service";
import { FeriadoService } from "./services/feriado.service";
import { EventosCalendarService } from "./services/eventos.calendar.service";
import { FrancoService } from "./services/franco.service";
import { CausaBajaService } from "./services/causa-baja.service";
import { ReportesService } from "./services/reportes.service";
import { ParteService } from "./services/parte.service";
import { ParteEstadoService } from "./services/parte-estado.service";
import { ParteAgenteService } from "./services/parte-agente.service";
import { ParteJustificacionService } from "./services/parte-justificacion.service";
import { UbicacionService } from "./services/ubicacion.service";
import { GuardiaService } from "./services/guardia.service";
import { GuardiaPeriodoService } from "./services/guardia-periodo.service";
import { GuardiaLoteService } from "./services/guardia-lote.service";
import { MenuService } from "./services/menu.service";
import { ObjectService } from "./services/tm/object.service";
import { IndicadorLicenciaService } from "src/app/services/indicador-licencia.service";
import { AuditService } from "src/app/services/audit.service";
import { NotaService } from "src/app/services/nota.service";
import { Auth } from "src/app/services/auth.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { PermisoService } from "src/app/services/permiso.service";
import { RolService } from "src/app/services/rol.service";
import { AdjuntoService } from './services/adjunto.service';
import { RecargoTurnoService } from './services/recargo-turno.service';
import { RecargoJustificacionService } from './services/recargo-justificacion.service';
import { RecargoService } from './services/recargo.service';

// Stores
import { CalendarStoreService } from "./stores/calendar.store.service";

// Pages
import { LoginPage } from "./pages/login/login.page";
import { LogoutComponent } from "src/app/pages/logout/logout.component";
import { ConfiguracionMenuPageComponent } from "./pages/home/configuracion-menu.page";
import { HomeMenuPageComponent } from "./pages/home/home-menu.page";
import { PartesMenuPageComponent } from "./pages/home/partes-menu.page";
import { SeguridadMenuPageComponent } from 'src/app/pages/home/seguridad-menu.page';

import { RoutingGuard, RoutingNavBar } from "./app-guard";

// ABM Agente
import { AgenteRegistroComponent } from "./modules/agente/pages/registro/agente-registro.component";
import { AgenteDatosBasicosComponent } from "./modules/agente/pages/registro/datos-basicos/agente-datos-basicos.component";
import { AgenteDatosDireccionComponent } from "./modules/agente/pages/registro/datos-contacto/agente-datos-direccion.component";
import { AgenteDatosContactoComponent } from "./modules/agente/pages/registro/datos-contacto/agente-datos-contacto.component";
import { AgenteDatosEducacionComponent } from "./modules/agente/pages/registro/datos-educacion/agente-datos-educacion.component";
import { AgenteDatosHistoriaLaboralComponent } from "./modules/agente/pages/registro/datos-historia-laboral/agente-datos-historia-laboral.component";
import { AgenteDatosCargoComponent } from "./modules/agente/pages/registro/datos-historia-laboral/datos-cargo/agente-datos-cargo.component";
import { AgenteDatosSituacionComponent } from "./modules/agente/pages/registro/datos-historia-laboral/datos-situacion/agente-datos-situacion.component";
import { AgenteDatosRegimenComponent } from "./modules/agente/pages/registro/datos-historia-laboral/datos-regimen/agente-datos-regimen.component";
import { AgenteDatosGeneralesComponent } from "./modules/agente/pages/registro/datos-historia-laboral/datos-generales/agente-datos-generales.component";
import { AgenteDatosNormaLegalComponent } from "src/app/modules/agente/pages/registro/datos-historia-laboral/datos-norma-legal/agente-datos-norma-legal.component";

// Busqueda Agente
import { AgenteSearchComponent } from "./modules/agente/pages/search/agente-search.component";
import { AgenteSearchFormComponent } from "./modules/agente/pages/search/search-form/agente-search-form.component";
import { SearchLeyendaComponent } from "./modules/agente/components/search-leyenda/search-leyenda.component";
import { AgenteItemListadoComponent } from "./modules/agente/pages/search/item-listado/agente-item-listado.component";
import { AgenteMultipleSelectionListComponent } from './modules/agente/pages/credencial/list/agente-multiple-selection-list.component';
import { AgenteMultipleSearchFormComponent } from './modules/agente/pages/credencial/list/search/agente-multiple-search-form.component';
import { AgentePrintListComponent } from './modules/agente/pages/credencial/impresion/agente-print-list.component';

// Agente Detalle
import { AgenteFotoComponent } from "./modules/agente/components/imagen-foto/agente-foto.component";
import { AgenteDetalleComponent } from "./modules/agente/components/agente-detalle/agente-detalle.component";
import { AgenteDetalleHeaderComponent } from './modules/agente/components/agente-detalle/header/agente-detalle-header-component';

// Agente Baja/Reactivar
import { AgenteBajaComponent } from "src/app/modules/agente/components/agente-baja/agente-baja.component";
import { AgenteBajaFormComponent } from "./modules/agente/components/agente-baja/agente-baja-form-component";
import { AgenteReactivarComponent } from "./modules/agente/components/agente-reactivar/agente-reactivar.component";
import { AgenteReactivarFormComponent } from "./modules/agente/components/agente-reactivar/agente-reactivar-form.component";

// Agente Historia Laboral
import { HistoriaLaboralCreateComponent } from "./modules/agente/components/agente-historia-laboral/historia-laboral-create.component";
import { HistoriaLaboralFormComponent } from "./modules/agente/components/agente-historia-laboral/historia-laboral-form.component";
import { HistoriaLaboralListComponent } from "./modules/agente/components/agente-historia-laboral/historia-laboral-list.component";
import { HistoriaLaboralItemListComponent } from "src/app/modules/agente/components/agente-historia-laboral/historia-laboral-item-list.component";

// Agente Notas
import { AgenteNotasListComponent } from "src/app/modules/agente/components/agente-notas/list/agente-notas-list.component";
import { AgenteNotasCreateUpdateComponent } from "src/app/modules/agente/components/agente-notas/list/create-update/agente-notas-create-update.component";
import { AgenteNotasFormComponent } from "src/app/modules/agente/components/agente-notas/list/create-update/agente-notas-form.component";

// Otros
import { AgenteFormSelectComponent } from "./modules/agente/components/agente-form-select/agente-form-select.component";
import { UbicaciónFormSelectComponent } from "./components/forms/ubicacion-form-select/ubicacion-form-select.component";

// Ausentismo
import { AgenteAusentismoComponent } from "./pages/ausentismo/agente-ausentismo.component";
import { AgenteCalendarComponent } from "./pages/ausentismo/calendar/agente-calendar.component";
import { MainCalendarComponent } from "./pages/ausentismo/calendar/main/main-calendar.component";
import { NavCalendarComponent } from "./pages/ausentismo/calendar/nav/nav-calendar.component";
import { HeadCalendarComponent } from "./pages/ausentismo/calendar/header/header-calendar.component";

import { AusentismoCargaComponent } from "./pages/ausentismo/create-update/ausentismo-carga.component";
import { AusentismoCargaAddComponent } from "./pages/ausentismo/create-update/create/ausentismo-carga-add.component";
import { AusentismoCargaUpdateComponent } from "./pages/ausentismo/create-update/update/ausentismo-carga-update.component";
import { AusentismoCargaFormComponent } from "./pages/ausentismo/create-update/form/ausentismo-form.component";
import { AusentismoSearchComponent } from "./pages/ausentismo/search/ausentismo-search.component";
import { AusentismoListadoComponent } from "./pages/ausentismo/search/item-listado/ausentismo-listado.component";
import { AusentismoSearchFormComponent } from "./pages/ausentismo/search/search-form/ausentismo-search-form.component";
import { AusentismoIndicadoresComponent } from "./pages/ausentismo/indicadores/ausentismo-indicadores.component";
import { IndicadorLicenciasDetalleComponent } from "./pages/ausentismo/indicadores/licencias-detalle/indicador-licencias-detalle.component";
import { IndicadorLicenciasComponent } from "./pages/ausentismo/indicadores/licencias/indicador-licencias.componente";

// Componentes Generales
import { ListadoComponent } from "./componentes/listado/listado.component";
import { ItemListadoComponent } from "./componentes/listado/item-listado/item-listado.component";
import { BuscadorComponent } from "./componentes/buscador/buscador.component";
import { DetalleComponent } from "./componentes/detalle/detalle.component";
import { TabsComponent } from "./componentes/tabs/tabs.component";
import { TabContactoComponent } from "./componentes/tabs/tab-contacto/tab-contacto.component";
import { EdicionComponent } from "./componentes/edicion/edicion.component";
import { UploaderStatusComponent } from "./components/file-manager/uploader.status.component";
import { FileManagerComponent } from "./components/file-manager/file.manager.component";
import { LogoSvgComponent } from "./styles/logo.svg";
import { AcronimoSvgComponent } from "./styles/acronimo.svg";
import { BlockMenuComponent } from "src/app/components/menu/block-menu.component";
import { PageMenuComponent } from "src/app/components/menu/page-menu.component";
import { CrudHeaderComponent } from "./modules/tm/components/crud/header/header.component";
import { SearchFieldComponent } from "./modules/tm/components/crud/search-field/search-field.component";
import { ColorPickerComponent } from "src/app/components/color-picker/color-picker.component";
import { AdjuntosListComponent } from './components/adjuntos/list/adjuntos-list.component';
import { AdjuntosCreateUpdateComponent } from './components/adjuntos/create-update/adjuntos-create-update.component';
import { AdjuntosFormComponent } from './components/adjuntos/create-update/adjuntos-form.component';


// Pipes
import { FechaPipe } from "./pipes/fecha.pipe";
import { TitlePipe } from "./pipes/title.pipe";
import { EdadPipe } from "./pipes/edad.pipe";
import { SanitizeHtmlPipe } from "./pipes/html.pipe";
import { HistorialMotivoPipe } from "src/app/pipes/historial.motivo.pipe";
import { TokenPipe } from "src/app/pipes/toke.pipe";

import { ContextMenuComponent } from "./components/context-menu/context-menu.component";

import { AgenteMockService } from "./hardcodeo/agente.service";
import { ModalComponent } from "./components/modal/modal.component";
import { LeyendaComponent } from "./components/leyenda/leyenda.component";

// List
import { ListItemComponent } from "./components/list/list-item.component";
import { ListItemColumnComponent } from "./components/list/list-item-col.component";
import { ListHeadComponent } from "./components/list/list-heading.component";

import { FeriadoListComponent } from "./modules/tm/components/feriados/list/feriado-list.component";
import { FeriadoSearchComponent } from "./modules/tm/components/feriados/list/search/feriado-search.component";
import { FeriadoCreateUpdateComponent } from "./modules/tm/components/feriados/create-update/feriado-create-update.component";

import { SituacionListComponent } from "./modules/tm/components/situacion/list/situacion-list.component";
import { SituacionSearchComponent } from "./modules/tm/components/situacion/list/search/situacion-search.component";
import { SituacionCreateUpdateComponent } from "./modules/tm/components/situacion/create-update/situacion-create-update.component";

import { ArticuloSearchComponent } from "./modules/tm/components/articulo/list/search/articulo-search.component";
import { ArticuloListComponent } from "./modules/tm/components/articulo/list/articulo-list.component";
import { ArticuloCreateUpdateComponent } from "./modules/tm/components/articulo/create-update/articulo-create-update.component";

import { ReporteSearchComponent } from "./pages/reportes/reporte-search.component";
import { ReporteAgenteFiltersComponent } from "./pages/reportes/forms/reporte-agente-filters.component";
import { ReporteSeleccionTipoComponent } from "./pages/reportes/forms/reporte-seleccion-tipo.component";
import { ReporteSeleccionFiltros } from "src/app/pages/reportes/forms/reporte-seleccion-filtros.component";
import { FormFilterAusentismo } from "src/app/pages/reportes/forms/ausentismo/form-filter-ausentismo.component";
import { FormFilterListAgentes } from "src/app/pages/reportes/forms/list-agente/form-filter-list-agentes.component";
import { FormFilterLegajos } from "src/app/pages/reportes/forms/legajo/form-filter-legajos.component";
import { FormFilterLicencias } from "src/app/pages/reportes/forms/licencias/form-filter-licencias.component";

import { ParteListComponent } from "./pages/partes/parte/list/parte-list.component";
import { ParteSearchFormComponent } from "./pages/partes/parte/list/search/parte-search.component";
import { ParteAgenteSearchFormComponent } from "src/app/pages/partes/parte-agente/list/search/parte-agente-search.component";
import { ParteAgenteItemListComponent } from "src/app/pages/partes/parte-agente/list/item/parte-agente-item-list.component";
import { ParteAgenteListComponent } from "src/app/pages/partes/parte-agente/list/parte-agente-list.component";
import { ParteAgenteListViewComponent } from "src/app/pages/partes/parte-agente/list-view/parte-agente-list-view.component";
import { ParteReporteListComponent } from "./pages/partes/reportes/partes/reporte-parte-list.component";
import { ParteReporteSearchFormComponent } from "./pages/partes/reportes/partes/search/parte-reporte-search.component";
import { ParteReporteItemListComponent } from "./pages/partes/reportes/partes/item/parte-reporte-item-list.component";
import { FichadaReporteItemListComponent } from "src/app/pages/partes/reportes/fichadas/item/fichada-reporte-item-list.component";
import { FichadaReporteSearchFormComponent } from "src/app/pages/partes/reportes/fichadas/search/fichada-reporte-search.component";
import { FichadaReporteListComponent } from "./pages/partes/reportes/fichadas/reporte-fichada-list.component";

// Guardias
import { GuardiaCreateUpdateComponent } from "./pages/guardias/guardia-servicio/create-update/guardia-create-update.component";
import { GuardiaFormComponent } from "./pages/guardias/guardia-servicio/create-update/form/guardia-form.component";
import { GuardiaPlanillaComponent } from "./pages/guardias/guardia-servicio/create-update/planilla/guardia-planilla.component";
import { GuardiaListComponent } from "src/app/pages/guardias/guardia-servicio/list/guardia-list.component";
import { GuardiaItemListComponent } from "src/app/pages/guardias/guardia-servicio/list/item/guardia-item-list.component";
import { GuardiaSearchFormComponent } from "src/app/pages/guardias/guardia-servicio/list/search/guardia-search-form.component";
import { RangeDirective } from "./directives/range";

// Recargos
import { RecargoListComponent } from './pages/recargos/list/recargo-list.component';
import { RecargoSearchFormComponent } from './pages/recargos/list/search/recargo-search.component';

import { AgenteSelectComponent } from "src/app/modules/agente/components/agente-select/agente-select.component";
import { AgenteSelectSearchFormComponent } from "src/app/modules/agente/components/agente-select/search/agente-select-search-form.component";
import { AgenteSelectInputComponent } from "src/app/modules/agente/components/agente-select-input/agente-select-input.component";

// TM
import { GuardiaPeriodoListComponent } from "src/app/modules/tm/components/guardia-periodos/list/guardia-periodo-list.component";
import { GuardiaPeriodoSearchComponent } from "src/app/modules/tm/components/guardia-periodos/list/search/guardia-periodo-search.component";
import { GuardiaPeriodoCreateUpdateComponent } from "src/app/modules/tm/components/guardia-periodos/create-update/guardia-periodo-create-update.component";
import { GuardiaPeriodoCreateUpdateFormComponent } from "./modules/tm/components/guardia-periodos/create-update/form/create-update-form.component";
import { GuardiaLotesListComponent } from "./modules/tm/components/guardia-lotes/list/guardia-lotes-list.component";
import { GuardiaLotesSearchComponent } from "./modules/tm/components/guardia-lotes/list/search/guardia-lotes-search.component";
import { GuardiaLotesCreateUpdateComponent } from "src/app/modules/tm/components/guardia-lotes/create-update/guardia-lotes-create-update.component";
import { RegimenHorarioListComponent } from "src/app/modules/tm/components/regimen-horario/list/regimen-horario-list.component";
import { RegimenHorarioSearchComponent } from "./modules/tm/components/regimen-horario/list/search/regimen-horario-search.component";
import { RegimenHorarioCreateUpdateComponent } from "./modules/tm/components/regimen-horario/create-update/regimen-horario-create-update.component";
import { LicenciaPeriodoSearchComponent } from "src/app/modules/tm/components/licencia-periodo/list/search/licencia-periodo-search.component";
import { LicenciaPeriodoListComponent } from "src/app/modules/tm/components/licencia-periodo/list/licencia-periodo-list.component";
import { LicenciaPeriodoCreateUpdateComponent } from "src/app/modules/tm/components/licencia-periodo/create-update/licencia-periodo-create-update.component";
import { RecargoTurnoListComponent } from './modules/tm/components/recargo-turnos/list/recargo-turno-list.component';
import { RecargoTurnoSearchComponent } from './modules/tm/components/recargo-turnos/list/search/recargo-turno-search.component';
import { RecargoTurnoCreateUpdateComponent } from './modules/tm/components/recargo-turnos/create-update/recargo-turno-create-update.component';
import { RecargoJustificacionListComponent } from './modules/tm/components/recargo-justificacion/list/recargo-justificacion-list.component';
import { RecargoJustificacionSearchComponent } from './modules/tm/components/recargo-justificacion/list/search/recargo-justificacion-search.component';
import { RecargoJustificacionCreateUpdateComponent } from './modules/tm/components/recargo-justificacion/create-update/recargo-justificacion-create-update.component';

// Auditoria
import { AuditSearchComponent } from "src/app/components/audit/list/search/audit-search.component";
import { AuditListComponent } from "src/app/components/audit/list/audit-list.component";

// Seguridad
import { UsuarioListComponent } from "src/app/pages/seguridad/usuario/list/usuario-list.component";
import { UsuarioSearchComponent } from "src/app/pages/seguridad/usuario/list/search/usuario-search.component";
import { UsuarioCreateUpdateComponent } from "src/app/pages/seguridad/usuario/create-update/usuario-create-update.component";
import { RolSearchComponent } from 'src/app/pages/seguridad/rol/list/search/rol-search.component';
import { RolListComponent } from 'src/app/pages/seguridad/rol/list/rol-list.component';
import { RolCreateUpdateComponent } from 'src/app/pages/seguridad/rol/create-update/rol-create-update.component';
import { PermisoListComponent } from 'src/app/pages/seguridad/permiso/permiso-list.component';


const ADMIN_COMPONENTS = [
    FeriadoListComponent,
    FeriadoSearchComponent,
    FeriadoCreateUpdateComponent,

    SituacionListComponent,
    SituacionSearchComponent,
    SituacionCreateUpdateComponent,

    ArticuloListComponent,
    ArticuloSearchComponent,
    ArticuloCreateUpdateComponent,

    GuardiaPeriodoListComponent,
    GuardiaPeriodoSearchComponent,
    GuardiaPeriodoCreateUpdateComponent,
    GuardiaPeriodoCreateUpdateFormComponent,

    GuardiaLotesListComponent,
    GuardiaLotesSearchComponent,
    GuardiaLotesCreateUpdateComponent,

    RegimenHorarioListComponent,
    RegimenHorarioSearchComponent,
    RegimenHorarioCreateUpdateComponent,

    LicenciaPeriodoListComponent,
    LicenciaPeriodoSearchComponent,
    LicenciaPeriodoCreateUpdateComponent,

    RecargoTurnoListComponent,
    RecargoTurnoSearchComponent,
    RecargoTurnoCreateUpdateComponent,
    RecargoJustificacionListComponent,
    RecargoJustificacionSearchComponent,
    RecargoJustificacionCreateUpdateComponent,
];

@NgModule({
    declarations: [
        AppComponent,
        LoginPage,
        LogoutComponent,
        HomeMenuPageComponent,
        ConfiguracionMenuPageComponent,
        PartesMenuPageComponent,
        SeguridadMenuPageComponent,

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
        AgenteNotasListComponent,
        AgenteNotasCreateUpdateComponent,
        AgenteNotasFormComponent,

        AgenteMultipleSelectionListComponent,
        AgenteMultipleSearchFormComponent,
        AgentePrintListComponent,

        HistoriaLaboralCreateComponent,
        HistoriaLaboralFormComponent,
        HistoriaLaboralListComponent,
        HistoriaLaboralItemListComponent,

        AgenteSearchComponent,
        AgenteSearchFormComponent,
        AgenteFotoComponent,
        AgenteItemListadoComponent,
        AgenteDetalleComponent,
        AgenteDetalleHeaderComponent,
        AgenteBajaComponent,
        AgenteBajaFormComponent,
        AgenteReactivarComponent,
        AgenteReactivarFormComponent,
        AgenteFormSelectComponent,
        AgenteSelectSearchFormComponent,
        AgenteSelectComponent,
        AgenteSelectInputComponent,

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

        // Recargos
        RecargoListComponent,
        RecargoSearchFormComponent,

        // Auditoria
        AuditSearchComponent,
        AuditListComponent,

        // Seguridad
        UsuarioListComponent,
        UsuarioSearchComponent,
        UsuarioCreateUpdateComponent,
        RolListComponent,
        RolSearchComponent,
        RolCreateUpdateComponent,
        PermisoListComponent,

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
        PageMenuComponent,
        CrudHeaderComponent,
        SearchFieldComponent,
        ColorPickerComponent,
        AdjuntosListComponent,
        AdjuntosCreateUpdateComponent,
        AdjuntosFormComponent,
        // Tablas Maestras,
        ...ADMIN_COMPONENTS,

        // Plex
        ListItemComponent,
        ListItemColumnComponent,
        ListHeadComponent,

        // Reportes
        ReporteSearchComponent,
        ReporteAgenteFiltersComponent,
        ReporteSeleccionTipoComponent,
        ReporteSeleccionFiltros,
        FormFilterAusentismo,
        FormFilterListAgentes,
        FormFilterLegajos,
        FormFilterLicencias,

        // Pipes
        FechaPipe,
        TitlePipe,
        EdadPipe,
        HistorialMotivoPipe,
        SanitizeHtmlPipe,
        TokenPipe,

        // Directives
        RangeDirective,

        LogoSvgComponent,
        AcronimoSvgComponent,
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

        FullCalendarModule,

        NgxPermissionsModule.forRoot(),
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
        IndicadorLicenciaService,
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
        MenuService,
        ObjectService,
        AuditService,
        NotaService,
        UsuarioService,
        PermisoService,
        RolService,
        AdjuntoService,
        RecargoTurnoService,
        RecargoJustificacionService,
        RecargoService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        UploaderStatusComponent,
        ParteAgenteItemListComponent,
        ParteAgenteSearchFormComponent,
        ParteReporteItemListComponent,
        ParteReporteSearchFormComponent,
        FichadaReporteSearchFormComponent,
        FichadaReporteItemListComponent,
        GuardiaItemListComponent,
        GuardiaSearchFormComponent,
        AgenteBajaFormComponent,
        HistoriaLaboralFormComponent,
        AgenteReactivarFormComponent,
        AgenteNotasCreateUpdateComponent,
        AdjuntosCreateUpdateComponent,
        ...ADMIN_COMPONENTS,
    ],
})
export class AppModule {}
