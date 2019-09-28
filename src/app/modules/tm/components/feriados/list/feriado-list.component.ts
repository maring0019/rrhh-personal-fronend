import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';
import { FeriadoSearchFormComponent } from './search/feriado-search.component';
import { FeriadoItemListComponent } from './item/feriado-item-list.component';


@Component({
    selector: 'app-feriado-list',
    templateUrl: '../../crud/list/crud-list.html',
})
export class FeriadoListComponent extends CRUDListComponent implements OnInit {

    public searchFormComponent = FeriadoSearchFormComponent;
    public itemListComponent = FeriadoItemListComponent;
    public titulo = 'Feriados';

    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver) {
        super(router, resolver);
    }

    public ngOnInit() {
        super.ngOnInit();
    }

}