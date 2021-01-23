import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';

import { IndicadorLicenciaService } from 'src/app/services/indicador-licencia.service';


@Component({
    selector: 'app-licencia-periodo-list',
    templateUrl: 'licencia-periodo-list.html',
})
export class LicenciaPeriodoListComponent extends ABMListComponent {

    public sortColumn = 'agente';
    // list-head options
    public columnDef =
    [
        {
            id: 'agente',
            title: 'Agente',
            size: '40'
        },
        {
            id: 'periodo',
            title: 'Periodo',
            size: '20'
        },
        {
            id: 'asignadas',
            title: 'Asignadas',
            size: '20'
        },
        {
            id: 'tomadas',
            title: 'Tomadas',
            size: '20'
        },
        {
            id: 'activo',
            title: 'Status',
            size: '10'
        }
    ]

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private indicadorService: IndicadorLicenciaService) {
            super(router, objectService);
         }

    protected get dataService(){
        return this.indicadorService;
    }

    public getItemActionsBaseUrl(){
        return 'configuracion/licencia-periodos';
    }

}