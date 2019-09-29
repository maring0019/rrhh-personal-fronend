import { Component, OnInit, ViewChild } from '@angular/core';
import { ReporteAgenteFiltersComponent } from './forms/reporte-agente-filters.component';
import { ReporteSeleccionTipoComponent } from './forms/reporte-seleccion-tipo.component';
import { ReportesService } from 'src/app/services/reportes.service';


@Component({
    selector: 'app-reporte-search',
    templateUrl: 'reporte-search.html',
})
export class ReporteSearchComponent implements OnInit {

    @ViewChild('agenteFilters') agenteFiltersComponent: ReporteAgenteFiltersComponent;
    // @ViewChild(AgenteDatosDireccionComponent) datosDireccion: AgenteDatosDireccionComponent;
    @ViewChild('tipoReporte') tipoReporteComponent: ReporteSeleccionTipoComponent;

    constructor(private reportesService: ReportesService){

    }
    
    public ngOnInit() {}

    public consultar(){
        const filtros_paso_1 = this.agenteFiltersComponent.prepareSearchParams();
        const filtros_paso_2 = this.tipoReporteComponent.prepareSearchParams();
        let queryParams = {...filtros_paso_1, ...filtros_paso_2};
        console.log('Hola!!!!!');
        console.log(filtros_paso_1);
        console.log(filtros_paso_2);
        console.log(queryParams);
        this.reportesService.download(queryParams)
            .subscribe(data => {                
                this.descargarArchivo(data);
            }, error => {
                console.log('download error:', JSON.stringify(error));
            }); 
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
    }
}