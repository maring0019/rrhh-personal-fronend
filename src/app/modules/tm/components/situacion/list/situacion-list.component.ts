import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';
import { SituacionSearchFormComponent } from './search/situacion-search.component';
import { SituacionItemListComponent } from 'src/app/modules/tm/components/situacion/list/item/situacion-item-list.component';

@Component({
    selector: 'app-situacion-list',
    templateUrl: '../../crud/list/crud-list.html',
})
export class SituacionListComponent extends CRUDListComponent implements OnInit {

    public searchFormComponent = SituacionSearchFormComponent;
    public itemListComponent = SituacionItemListComponent;

    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver) {
        super(router, resolver);
    }

    public ngOnInit() {
        super.ngOnInit();
    }

}