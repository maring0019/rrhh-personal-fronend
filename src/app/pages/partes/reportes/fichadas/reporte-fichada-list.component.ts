import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from 'src/app/services/modal.service';
import { ReportesService } from 'src/app/services/reportes.service';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';
import { FichadaReporteSearchFormComponent } from './search/fichada-reporte-search.component';
import { FichadaReporteItemListComponent } from './item/fichada-reporte-item-list.component';



@Component({
    selector: 'app-reporte-fichada-list',
    templateUrl: 'reporte-fichada-list.html',
})
export class FichadaReporteListComponent extends CRUDListComponent implements OnInit {

    public searchFormComponent = FichadaReporteSearchFormComponent;
    public itemListComponent = FichadaReporteItemListComponent;
    public titulo = 'Reporte Ingresos y Egresos';
    public canCreateObject: boolean = false;
    public modalId = 'modal-show-ingresos-egresos';
    public generandoReporte = false; // Flag al momento de generar el reporte
    public htmlReport; // Contenedor para el reporte generado en formato html
    public reportName = 'fichadas_agentes'; // Id del reporte a llamar en el servicio de reportes
    public printing:Boolean = false;

    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver,
        private modalService: ModalService,
        private reportesService: ReportesService) {
        super(router, resolver); 
    }

    public ngOnInit() {
        super.ngOnInit();
    }

    public onCerrar(){
        this.router.navigate(['/partes']);
    }

    private getReportParams(){
        const params = this.searchFormComponentRef.instance.prepareSearchParams();
        return {...params, tipoReporte:this.reportName}
    }

    public onPrintableView(){
        this.modalService.open(this.modalId);
        this.generandoReporte = true;
        this.reportesService.view(this.getReportParams())
            .subscribe(data => {
                this.generandoReporte = false;
                this.htmlReport = data._body;
            }, error => {
                this.generandoReporte = false;
                console.log('Report error:', JSON.stringify(error));
            }); 
    }

    public onPrint(){
        this.printing = true;
        this.reportesService.print(this.getReportParams())
            .subscribe(data => {           
                this.reportesService.descargarArchivo(data);     
                this.printing = false;
            }, error => {
                this.printing = false;
                console.log('download error:', JSON.stringify(error));
            }); 
    }

    public onCloseModal(){
        this.modalService.close(this.modalId);
    }



}