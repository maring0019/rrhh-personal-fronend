import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { ABMCreateUpdateComponent } from '../../crud/abm-create-update.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { PuestoService } from 'src/app/services/puesto.service';

@Component({
    selector: 'app-puesto-create-update',
    templateUrl: 'puesto-create-update.html'
  })

export class PuestoCreateUpdateComponent extends ABMCreateUpdateComponent {

    titulo = 'Organigrama - Puestos';
    modelName = 'puesto';
    
    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private puestoService: PuestoService)
    {
        super(router, route, location, plex, formBuilder, objectService)
    }

    protected get dataService(){
        return this.puestoService;
    }

    protected initForm(){
        return this.formBuilder.group({
            _id            : [this.object._id],
            nombre         : [this.object.nombre]
        });
    }
}