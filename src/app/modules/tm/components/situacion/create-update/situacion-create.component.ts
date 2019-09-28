import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CRUDCreateUpdateComponent } from 'src/app/modules/tm/components/crud/create-update/crud-create-update.component';
import { SituacionCreateFormComponent } from 'src/app/modules/tm/components/situacion/create-update/form/situacion-create-form.component';



@Component({
    selector: 'app-feriado-create',
    templateUrl: '../../crud/create-update/crud-create-update.html'
  })

export class SituacionCreateComponent extends CRUDCreateUpdateComponent implements OnInit {
    
    public formComponent = SituacionCreateFormComponent;
    
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