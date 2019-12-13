import { Component, OnInit, ViewChild } from '@angular/core';
import { ReporteAgenteFiltersComponent } from './forms/reporte-agente-filters.component';
import { ReporteSeleccionTipoComponent } from './forms/reporte-seleccion-tipo.component';

import { ReportesService } from 'src/app/services/reportes.service';
import { ModalService } from 'src/app/services/modal.service';


@Component({
    selector: 'app-reporte-search',
    templateUrl: 'reporte-search.html',
})
export class ReporteSearchComponent implements OnInit {

    public generandoReporte = false; // Flag al momento de generar el reporte
    public htmlReport; // Contenedor para el reporte generado en formato html

    // TODO ver porque se resetean los forms y no se pueden recuperar los valores
    // previos para utilizar en la impresion 
    public reportQueryParams; 

    @ViewChild('agenteFilters') agenteFiltersComponent: ReporteAgenteFiltersComponent;
    // @ViewChild('propiedadesFilters') datosDireccion: AgenteDatosDireccionComponent;
    @ViewChild('tipoReporte') tipoReporteComponent: ReporteSeleccionTipoComponent;

    constructor(
        private reportesService: ReportesService,
        private modalService: ModalService){

    }
    
    public ngOnInit() {}

    public onSearch(){
        this.prepareSearchParams();
        const tipoReporte = this.getTipoReporte();
        this.generandoReporte = true;
        this.reportesService.show(tipoReporte, this.reportQueryParams)
            .subscribe(data => {
                this.generandoReporte = false;
                this.htmlReport = data._body;
                this.modalService.open('modal-show-results');
            }, error => {
                this.generandoReporte = false;
                console.log('Report error:', JSON.stringify(error));
            }); 
    }

    public onPrint(){
        const tipoReporte = this.getTipoReporte();
        this.generandoReporte = true;
        this.reportesService.download(tipoReporte, this.reportQueryParams)
            .subscribe(data => {                
                this.descargarArchivo(data);
            }, error => {
                this.generandoReporte = false;
                console.log('download error:', JSON.stringify(error));
            }); 
    }

    public onCloseModal(){
        this.modalService.close('modal-show-results');
    }


    private getTipoReporte(){
        const form = this.tipoReporteComponent.form.value;
        if (form.reporte) return form.reporte.id;
    }

    private prepareSearchParams(){
        const filtros_paso_1 = this.agenteFiltersComponent.prepareSearchParams();
        const filtros_paso_2 = this.tipoReporteComponent.prepareSearchParams();
        let queryParams = {...filtros_paso_1, ...filtros_paso_2};
        // console.log('Filtros!!!!!');
        // console.log(filtros_paso_1);
        // console.log(filtros_paso_2);
        console.log(queryParams);
        this.reportQueryParams = queryParams;
        // return queryParams;
    }


    private descargarArchivo(data){
        let url = window.URL.createObjectURL(data.file);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = data.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
        this.generandoReporte = false; 
    }
}