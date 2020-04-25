import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { ABMCreateUpdateComponent } from '../../crud/abm-create-update.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { FeriadoService } from 'src/app/services/feriado.service';

@Component({
    selector: 'app-feriado-create-update',
    templateUrl: 'feriado-create-update.html'
  })

export class FeriadoCreateUpdateComponent extends ABMCreateUpdateComponent {

    titulo = 'Feríados';
    
    constructor(
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private feriadoService: FeriadoService)
    {
        super(route, location, plex, formBuilder, objectService)
    }

    protected get dataService(){
        return this.feriadoService;
    }

    protected initForm(){
        return this.formBuilder.group({
            _id                   : [this.object._id],
            fecha                 : [this.object.fecha],
            descripcion           : [this.object.descripcion],
        });
    }
}