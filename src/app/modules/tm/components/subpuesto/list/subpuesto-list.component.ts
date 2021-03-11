import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { SubPuestoService } from 'src/app/services/subpuesto.service';


@Component({
    selector: 'app-subpuesto-list',
    templateUrl: 'subpuesto-list.html',
})
export class SubPuestoListComponent extends ABMListComponent {

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
        private subpuestoService: SubPuestoService) {
            super(router, objectService);
         }

    protected get dataService(){
        return this.subpuestoService;
    }

}