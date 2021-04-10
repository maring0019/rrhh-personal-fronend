import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

import { Plex } from '@andes/plex';
import { CRUDItemListComponent } from 'src/app/modules/tm/components/crud/list/item/crud-item-list.component';

import { GuardiaService } from 'src/app/services/guardia.service';
import { Auth } from 'src/app/services/auth.service';
import { ReportesService } from 'src/app/services/reportes.service';


@Component({
    selector: 'app-guardia-item-list',
    templateUrl: './guardia-item-list.html',
})
export class GuardiaItemListComponent extends CRUDItemListComponent{
    GUARDIA_SIN_CONFIRMAR = 0;
    GUARDIA_CONFIRMADA = 1;
    GUARDIA_PROCESADA = 2;

    public printing = false;
    
    constructor(
            public router: Router,
            public plex: Plex,
            private guardiaService: GuardiaService,
            private authService: Auth,
            private reportesService: ReportesService) {
        super(router, plex);
    }

    public async canEdit(object){
        if (await this.authService.check('guardias:guardia:procesar_guardia')){
            return true;
        }
        else{
            return (!object.estado  || object.estado < 2);
        }      
    }

    public onNavigate(objeto) {
        if (objeto._id){
            this.router.navigate(['guardias/editar/' + objeto._id]);
        }
    }

    public onProcesar(objeto) {
        if (objeto._id){
            this.router.navigate(['guardias/procesar/' + objeto._id]);
        }
    }

    public onHabilitarEdicion(object){
        this.plex.confirm(`Al confirmar se habilita al Jefe de Servicio
            a realizar modificaciones nuevamente sobre la guardia seleccionada.`)
        .then( confirm => {
            if (confirm) return this.updateGuardia(object);
        });
         
    }

    private updateGuardia(guardia){
        this.guardiaService.putAndHabilitarEdicion(guardia)
            .subscribe( guardiaActualizada => {
                this.plex.info('success', `Guardia modificada correctamente.`);
                this.delete.emit(guardiaActualizada);
                },
                error => this.plex
                            .info('danger', 'No se pudo actualizar correctamente la Guardia')
                );
    }

    public onExportar(objeto) {
        this.guardiaService.generarCSV(objeto)
            .subscribe(data => {
                this.descargarArchivo(data, { type: 'text/csv' });
            })
    }

    private descargarArchivo(data: any, headers: any): void {
        let blob = new Blob([data], headers);
        // TODO Definir nombre del csv
        let nombreArchivo = 'guardia-exportada.csv';
        saveAs(blob, nombreArchivo);
    }

    /**
     * Impresion de una guardia en formato PDF
     * @param item guardia a imprimir
     */
    public onImprimir(item){
        this.printing = true;
        this.reportesService.print({ tipoReporte:'guardias', _id:item._id })
            .subscribe(data => {           
                this.reportesService.descargarArchivo(data);     
                this.printing = false;
            }, error => {
                this.printing = false;
                console.log('download error:', JSON.stringify(error));
            }); 
    }

} 