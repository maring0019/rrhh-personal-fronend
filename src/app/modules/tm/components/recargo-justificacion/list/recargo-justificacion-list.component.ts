import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { RecargoJustificacionService } from 'src/app/services/recargo-justificacion.service';


@Component({
    selector: 'app-recargo-justificacion-list',
    templateUrl: 'recargo-justificacion-list.html',
})
export class RecargoJustificacionListComponent extends ABMListComponent {

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
        private recargoJustificacionService: RecargoJustificacionService) {
            super(router, objectService);
         }

    protected get dataService(){
        return this.recargoJustificacionService;
    }

}