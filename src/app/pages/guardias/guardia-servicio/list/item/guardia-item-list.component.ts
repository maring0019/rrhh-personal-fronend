import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

import { Plex } from '@andes/plex';
import { CRUDItemListComponent } from 'src/app/modules/tm/components/crud/list/item/crud-item-list.component';

import { GuardiaService } from 'src/app/services/guardia.service';
import { Auth } from 'src/app/services/auth.service';


@Component({
    selector: 'app-guardia-item-list',
    templateUrl: './guardia-item-list.html',
})
export class GuardiaItemListComponent extends CRUDItemListComponent{
    
    constructor(
            public router: Router,
            public plex: Plex,
            private guardiaService: GuardiaService,
            private authService: Auth) {
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

    public onExportar(objeto) {
        this.guardiaService.generarCsv(objeto)
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
} 