import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';

import { ObjectService } from 'src/app/services/tm/object.service';
import { ParteService } from 'src/app/services/parte.service';
import { ModalService } from 'src/app/services/modal.service';
import { ReportesService } from 'src/app/services/reportes.service';


@Component({
    selector: 'app-reporte-parte-list',
    templateUrl: 'reporte-parte-list.html',
})
export class ParteReporteListComponent extends ABMListComponent {

    public modalId = 'modal-show-partes';
    public generandoReporte = false; // Flag al momento de generar el reporte
    public htmlReport; // Contenedor para el reporte generado en formato html
    public reportName = 'partes_agentes'; // Id del reporte a llamar en el servicio de reportes
    public printing:Boolean = false;


    // list-head options
    public columnDef =
    [
        {
            id: 'fecha-parte',
            title: 'Fecha Parte',
            size: '15',
            sort: 'desc'
        },
        {
            id: 'usuario-envio',
            title: 'Usuario del Envío',
            size: '15'
        }
        ,
        {
            id: 'fecha-envio',
            title: 'Fecha Envio',
            size: '10'
        },
        {
            id: 'entrada',
            title: 'Entrada',
            size: '15'
        },
        {
            id: 'salida',
            title: 'Salida',
            size: '15'
        },
        {
            id: 'justificacion',
            title: 'Justificación',
            size: '15'
        },
        {
            id: 'articulo',
            title: 'Artículo',
            size: '10'
        },
        {
            id: 'observaciones',
            title: 'Observaciones',
            size: '10'
        }
    ]

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private parteService: ParteService,
        private modalService: ModalService,
        private reportesService: ReportesService,
        public plex: Plex) {
            super(router, objectService);
         }

    /**
     * Overriden. Provide custom search
     * @param searchParams 
     */
    search(searchParams){
        this.searchStart(searchParams);
        this.parteService.getPartesAgenteReporte(searchParams)
        .subscribe(
            objects => {
                this.searchEnd(objects);
            },
            (err) => {
                this.searchEnd([]);
            }
        );
    }

    protected get dataService(){
        return this.parteService;
    }

    public onPrintableView(){
        this.modalService.open(this.modalId);
        this.generandoReporte = true;
        const params = this.searchParams;
        this.reportesService.show(this.reportName, params)
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
        this.reportesService.download(this.reportName, this.searchParams)
            .subscribe(data => {           
                this.reportesService.descargarArchivo(data);     
                this.printing = false;
            }, error => {
                this.printing = false;
                console.log('download error:', JSON.stringify(error));
            }); 
    }

    public onCancel(){
        this.router.navigate(['/partes']);
    }

    public onCloseModal(){
        this.modalService.close(this.modalId);
    }

}