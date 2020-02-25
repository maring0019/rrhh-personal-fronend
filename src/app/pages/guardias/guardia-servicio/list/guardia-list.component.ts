import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';

import { GuardiaSearchFormComponent } from './search/guardia-search-form.component';
import { GuardiaItemListComponent } from './item/guardia-item-list.component';

@Component({
    selector: 'app-guardia-list',
    templateUrl: '../../../../modules/tm/components/crud/list/crud-list.html',
})
export class GuardiaListComponent extends CRUDListComponent implements OnInit {

    public searchFormComponent = GuardiaSearchFormComponent;
    public itemListComponent = GuardiaItemListComponent;
    public titulo = 'Planillas de Guardias';
    public canCreateObject: boolean = true;
    
    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver) {
        super(router, resolver); 
    }

    public ngOnInit() {
        super.ngOnInit();
    }

    public onCerrar(){
        this.router.navigate(['/']);
    }

}