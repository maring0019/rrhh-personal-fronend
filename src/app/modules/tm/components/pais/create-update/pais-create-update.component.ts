import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { ABMCreateUpdateComponent } from '../../crud/abm-create-update.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
    selector: 'app-pais-create-update',
    templateUrl: 'pais-create-update.html'
  })

export class PaisCreateUpdateComponent extends ABMCreateUpdateComponent {

    titulo = 'General - Paises';
    modelName = 'pais';
    
    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private paisService: PaisService)
    {
        super(router, route, location, plex, formBuilder, objectService)
    }

    protected get dataService(){
        return this.paisService;
    }

    protected initForm(){
        return this.formBuilder.group({
            _id            : [this.object._id],
            nombre         : [this.object.nombre],
            gentilicio     : [this.object.gentilicio]
        });
    }
}