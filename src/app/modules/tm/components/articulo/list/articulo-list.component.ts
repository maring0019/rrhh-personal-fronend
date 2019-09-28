import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';
import { ArticuloSearchFormComponent } from './search/articulo-search.component';
import { ArticuloItemListComponent } from './item/articulo-item-list.component';


@Component({
    selector: 'app-articulo-list',
    templateUrl: '../../crud/list/crud-list.html',
})
export class ArticuloListComponent extends CRUDListComponent implements OnInit {

    public searchFormComponent = ArticuloSearchFormComponent;
    public itemListComponent = ArticuloItemListComponent;
    public titulo = 'Articulos';

    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver) {
        super(router, resolver); 
    }

    public ngOnInit() {
        super.ngOnInit();
    }

}