import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { PuestoService } from 'src/app/services/puesto.service';


@Component({
    selector: 'app-puesto-list',
    templateUrl: 'puesto-list.html',
})
export class PuestoListComponent extends ABMListComponent {

    public sortColumn = 'nombre';
    // list-head options
    public columnDef =
    [
        {
            id: 'nombre',
            title: 'Nombre',
            size: '100'
        },
    ]

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private puestoService: PuestoService) {
            super(router, objectService);
         }

    protected get dataService(){
        return this.puestoService;
    }

}