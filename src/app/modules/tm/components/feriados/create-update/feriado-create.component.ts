import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CRUDCreateUpdateComponent } from 'src/app/modules/tm/components/crud/create-update/crud-create-update.component';
import { FeriadoCreateFormComponent } from 'src/app/modules/tm/components/feriados/create-update/form/feriado-create-form.component';


@Component({
    selector: 'app-feriado-create-update',
    templateUrl: '../../crud/create-update/crud-create-update.html'
  })

export class FeriadoCreateComponent extends CRUDCreateUpdateComponent implements OnInit {
    
    public formComponent = FeriadoCreateFormComponent;
    
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