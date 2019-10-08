import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';

import { ParteSearchFormComponent } from './search/parte-search.component';
import { ParteItemListComponent } from './item/parte-item-list.component';

@Component({
    selector: 'app-parte-list',
    templateUrl: '../../../../modules/tm/components/crud/list/crud-list.html',
})
export class ParteListComponent extends CRUDListComponent implements OnInit {

    public searchFormComponent = ParteSearchFormComponent;
    public itemListComponent = ParteItemListComponent;
    public titulo = 'Partes Diarios';
    public canCreateObject: boolean = false;

    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver) {
        super(router, resolver); 
    }

    public ngOnInit() {
        super.ngOnInit();
    }

}