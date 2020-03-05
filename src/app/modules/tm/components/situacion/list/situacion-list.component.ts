import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';

import { TipoSituacionService } from 'src/app/services/tm/situacion.service';
import { ObjectService } from 'src/app/services/tm/object.service';


@Component({
    selector: 'app-situacion-list',
    templateUrl: 'situacion-list.html',
})
export class SituacionListComponent extends ABMListComponent {

    // list-head options
    public columnDef =
    [
        { 
            id: 'nombre',
            name: 'Nombre',
            size: '50'
        },
        {
            id: 'req_vencimiento',
            name: 'Requiere Vencimiento',
            size: '25'
        },
        {
            id: 'activo',
            name: 'Activo',
            size: '25'
        }
    ]

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private tipoSituacionService:TipoSituacionService)
    {
        super(router, objectService);
    }


    protected get dataService(){
        return this.tipoSituacionService;
    }

}