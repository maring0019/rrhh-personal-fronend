import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';

import { ArticuloService } from 'src/app/services/articulo.service';


@Component({
    selector: 'app-articulo-list',
    templateUrl: 'articulo-list.html',
})
export class ArticuloListComponent extends ABMListComponent {

    // list-head options
    public columnDef =
    [
        {
            name: 'Código',
            size: '10'
        },
        {
            name: 'Nombre',
            size: '10'
        },
        {
            name: 'Descripción',
            size: '40'
        },
        {
            name: 'Días Corridos',
            size: '10'
        },
        {
            name: 'Días Hábiles',
            size: '10'
        },
        {
            name: 'Descuenta Días Licencia',
            size: '20'
        }

    ]

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private articuloService: ArticuloService) {
            super(router, objectService);
         }

    protected get dataService(){
        return this.articuloService;
    }

}