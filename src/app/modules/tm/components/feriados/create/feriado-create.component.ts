import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CRUDCreateComponent } from 'src/app/modules/tm/components/crud/create/crud-create.component';
import { FeriadoCreateFormComponent } from 'src/app/modules/tm/components/feriados/create/form/feriado-create-form.component';


@Component({
    selector: 'app-feriado-create',
    templateUrl: '../../crud/create/crud-create.html'
  })

export class FeriadoCreateComponent extends CRUDCreateComponent implements OnInit {
    
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