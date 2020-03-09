import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';

import { FeriadoService } from 'src/app/services/feriado.service';


@Component({
    selector: 'app-feriado-list',
    templateUrl: 'feriado-list.html',
})
export class FeriadoListComponent extends ABMListComponent {

    public sortColumn = '-fecha';

    // list-head options
    public columnDef =
    [
        {
            id: 'fecha',
            title: 'Fecha',
            size: '20',
            sort: 'desc'
        },
        {
            id: 'descripcion',
            title: 'Descripción',
            size: '80'
        }
    ]

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private feriadoService: FeriadoService) {
            super(router, objectService);
         }

    protected get dataService(){
        return this.feriadoService;
    }

}