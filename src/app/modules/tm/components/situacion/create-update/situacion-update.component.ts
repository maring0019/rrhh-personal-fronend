import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CRUDCreateUpdateComponent } from 'src/app/modules/tm/components/crud/create-update/crud-create-update.component';
import { SituacionUpdateFormComponent } from 'src/app/modules/tm/components/situacion/create-update/form/situacion-update-form.component';


@Component({
    selector: 'app-situacion-create',
    templateUrl: '../../crud/create-update/crud-create-update.html'
  })

export class SituacionUpdateComponent extends CRUDCreateUpdateComponent implements OnInit {
    
    public formComponent = SituacionUpdateFormComponent;
    
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