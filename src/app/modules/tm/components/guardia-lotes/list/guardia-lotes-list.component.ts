import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';

import { GuardiaLoteService } from 'src/app/services/guardia-lote.service';

@Component({
    selector: 'app-guardia-lotes-list',
    templateUrl: 'guardia-lotes-list.html',
})
export class GuardiaLotesListComponent extends ABMListComponent {

    // list-head options
    public columnDef =
    [
        { 
            id: 'numero',
            title: 'Número',
            size: '10'
        },
        {
            id: 'servicio',
            title: 'Servicio',
            size: '40'
        },
        {
            id: 'tipoGuardia',
            title: 'Tipo de Guardia',
            size: '20'
        },
        {
            id: 'categoria',
            title: 'Categoría',
            size: '30'
        }
    ]

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private guardiaLoteService: GuardiaLoteService) {
            super(router, objectService);
         }

    protected get dataService(){
        return this.guardiaLoteService;
    }

}