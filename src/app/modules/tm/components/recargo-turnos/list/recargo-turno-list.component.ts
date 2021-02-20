import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { RecargoTurnoService } from 'src/app/services/recargo-turno.service';


@Component({
    selector: 'app-recargo-turno-list',
    templateUrl: 'recargo-turno-list.html',
})
export class RecargoTurnoListComponent extends ABMListComponent {

    public sortColumn = 'nombre';
    // list-head options
    public columnDef =
    [
        {
            id: 'nombre',
            title: 'Nombre',
            size: '30'
        },
        {
            id: 'observaciones',
            title: 'Observaciones',
            size: '70'
        },
    ]

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private recargoTurnoService: RecargoTurnoService) {
            super(router, objectService);
         }

    protected get dataService(){
        return this.recargoTurnoService;
    }

}