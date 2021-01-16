import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { ABMCreateUpdateComponent } from '../../crud/abm-create-update.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { FeriadoService } from 'src/app/services/feriado.service';
import { patchFormDates } from 'src/app/utils/formUtils';

@Component({
    selector: 'app-feriado-create-update',
    templateUrl: 'feriado-create-update.html'
  })

export class FeriadoCreateUpdateComponent extends ABMCreateUpdateComponent {

    titulo = 'Feríados';
    modelName = 'feriado';
    
    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private feriadoService: FeriadoService)
    {
        super(router, route, location, plex, formBuilder, objectService)
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