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

    public sortColumn = 'codigo';
    // list-head options
    public columnDef =
    [
        {
            id: 'codigo',
            title: 'Código',
            size: '10'
        },
        {
            id: 'nombre',
            title: 'Nombre',
            size: '10'
        },
        {
            id: 'descripcion',
            title: 'Descripción',
            size: '40'
        },
        {
            id: 'diasHabiles',
            title: 'Días Hábiles',
            size: '10'
        },
        {
            id: 'descuentaDiasLicencia',
            title: 'Descuenta Días Licencia',
            size: '20'
        },
        {
            id: 'color',
            title: 'Color',
            size: '10'
        },

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