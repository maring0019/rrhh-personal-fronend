import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';

import { ParteAgenteSearchFormComponent } from './search/parte-agente-search.component';
import { ParteAgenteItemListComponent } from './item/parte-agente-item-list.component';

@Component({
    selector: 'app-parte-agente-list',
    templateUrl: '../../../../modules/tm/components/crud/list/crud-list.html',
})
export class ParteAgenteListComponent extends CRUDListComponent implements OnInit {

    public searchFormComponent = ParteAgenteSearchFormComponent;
    public itemListComponent = ParteAgenteItemListComponent;
    public titulo = 'Partes Diarios Agentes';
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