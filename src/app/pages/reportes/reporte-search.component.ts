import { Component, OnInit, ViewChild } from "@angular/core";
import { Plex } from "@andes/plex";
import * as formUtils from "src/app/utils/formUtils";
import { ReporteAgenteFiltersComponent } from "./forms/reporte-agente-filters.component";
import { ReporteSeleccionTipoComponent } from "./forms/reporte-seleccion-tipo.component";

import { Auth } from 'src/app/services/auth.service';
import { ReportesService } from "src/app/services/reportes.service";
import { ModalService } from "src/app/services/modal.service";
import { ReporteSeleccionFiltros } from "src/app/pages/reportes/forms/reporte-seleccion-filtros.component";


@Component({
    selector: "app-reporte-search",
    templateUrl: "reporte-search.html",
})
export class ReporteSearchComponent implements OnInit {
    
    // Permisos especiales. Si el usuario logueado dispone de este permiso podra
    // consultar libremente en el modulo. Caso contrario estará restringido a los 
    // servicios disponibles como jefe de servicio/dpto/etc.    
    public canViewAllServices:Boolean = false;

    // Listado de servicios permitidos para consultar / servicio alias ubicacion 
    public serviciosAllowed;
    
    public generandoReporte = false; // Flag al momento de generar el reporte
    public htmlReport; // Contenedor para el reporte generado en formato html

    public reportQueryParams;

    // prettier-ignore
    @ViewChild("agenteFilters") agenteFiltersComponent: ReporteAgenteFiltersComponent;
    @ViewChild("propiedadesFilters") filtrosExtras: ReporteSeleccionFiltros;
    @ViewChild("tipoReporte")
    tipoReporteComponent: ReporteSeleccionTipoComponent;

    constructor(
        private authService: Auth,
        private reportesService: ReportesService,
        private modalService: ModalService,
        private plex: Plex
    ) {}

    async ngOnInit() {
        this.canViewAllServices = await this.authService.check('reportes:reporte:servicios_query_all');
        this.serviciosAllowed = this.getServiciosAllowed();
    }

   
    private getServiciosAllowed(){
        if (this.serviciosAllowed) return this.serviciosAllowed;
        
        if (this.canViewAllServices){
            return []; // Una lista vacia implica que puede ver todos los servicios!
        }
        else{
            return this.authService.servicios;
        }
    }

    public onSearch() {
        if (this.agenteFiltersComponent.form.invalid) {
            formUtils.markFormAsInvalid(this.agenteFiltersComponent.form);
            return;
        }
        if (!this.tipoReporteComponent.allFormsValid()) return;

        this.prepareSearchParams();
        this.generandoReporte = true;
        this.modalService.open("modal-show-results");
        this.reportesService.view(this.reportQueryParams).subscribe(
            (data) => {
                this.generandoReporte = false;
                this.htmlReport = data._body;
            },
            (error) => {
                this.generandoReporte = false;
                this.modalService.close("modal-show-results");
                this.plex.info("danger", error);
            }
        );
    }

    private allFormsValid() {
        if (this.agenteFiltersComponent.form.invalid) {
            formUtils.markFormAsInvalid(this.agenteFiltersComponent.form);
        }
    }

    public onPrint() {
        this.generandoReporte = true;
        this.reportesService.print(this.reportQueryParams).subscribe(
            (data) => {
                this.descargarArchivo(data);
            },
            (error) => {
                this.generandoReporte = false;
                this.plex.info("danger", error);
            }
        );
    }

    public onCloseModal() {
        this.modalService.close("modal-show-results");
    }

    private prepareSearchParams() {
        const filtros_paso_1 = this.agenteFiltersComponent.prepareSearchParams();
        const filtros_paso_2 = this.filtrosExtras.prepareSearchParams();
        const filtros_paso_3 = this.tipoReporteComponent.prepareSearchParams();
        let queryParams = {
            ...filtros_paso_1,
            ...filtros_paso_2,
            ...filtros_paso_3,
        };
        // console.log(queryParams);
        this.reportQueryParams = queryParams;
    }

    private descargarArchivo(data) {
        let url = window.URL.createObjectURL(data.file);
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "display: none");
        a.href = url;
        a.download = data.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
        this.generandoReporte = false;
    }
}
