import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CRUDCreateUpdateComponent } from 'src/app/modules/tm/components/crud/create-update/crud-create-update.component';
import { ArticuloUpdateFormComponent } from './form/articulo-update-form.component';


@Component({
    selector: 'app-articulo-update',
    templateUrl: '../../crud/create-update/crud-create-update.html'
  })

export class ArticuloUpdateComponent extends CRUDCreateUpdateComponent implements OnInit {
    
    public formComponent = ArticuloUpdateFormComponent;
    
    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver,
        public location: Location
    ){
        super(router, resolver, location);
    }

    public ngOnInit() {
        super.ngOnInit()
    }

}