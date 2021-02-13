import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';

import { GuardiaSearchFormComponent } from './search/guardia-search-form.component';
import { GuardiaItemListComponent } from './item/guardia-item-list.component';
import { Auth } from 'src/app/services/auth.service';

@Component({
    selector: 'app-guardia-list',
    templateUrl: '../../../../modules/tm/components/crud/list/crud-list.html',
})
export class GuardiaListComponent extends CRUDListComponent implements OnInit {

    public searchFormComponent = GuardiaSearchFormComponent;
    public itemListComponent = GuardiaItemListComponent;
    public titulo = 'Planillas de Guardias';
    public canCreateObject: boolean = false;
    
    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver,
        private authService: Auth) {
        super(router, resolver); 
    }


    public async ngOnInit() {
        super.ngOnInit();
        this.canCreateObject = await this.authService.check('guardias:guardia:add_guardia');
    }

    public onCerrar(){
        this.router.navigate(['/']);
    }

    public altaObject(){
        this.router.navigate(['guardias/crear']);
    }

}