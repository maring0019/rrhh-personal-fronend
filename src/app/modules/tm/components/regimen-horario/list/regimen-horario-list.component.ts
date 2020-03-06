import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';

import { RegimenHorarioService } from 'src/app/services/regimen-horario.service';



@Component({
    selector: 'app-regimen-horario-list',
    templateUrl: 'regimen-horario-list.html',
})
export class RegimenHorarioListComponent extends ABMListComponent {

    // list-head options
    public columnDef =
    [
        { 
            id: 'nombre',
            name: 'Nombre',
            size: '50'
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
        private regimenHorarioService: RegimenHorarioService) {
            super(router, objectService);
         }

    protected get dataService(){
        return this.regimenHorarioService;
    }

}