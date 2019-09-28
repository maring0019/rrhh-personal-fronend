import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CRUDCreateUpdateComponent } from 'src/app/modules/tm/components/crud/create-update/crud-create-update.component';
import { FeriadoUpdateFormComponent } from 'src/app/modules/tm/components/feriados/create-update/form/feriado-update-form.component';

@Component({
    selector: 'app-feriado-update',
    templateUrl: '../../crud/create-update/crud-create-update.html'
  })

export class FeriadoUpdateComponent extends CRUDCreateUpdateComponent implements OnInit {
    
    public formComponent = FeriadoUpdateFormComponent;
    
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