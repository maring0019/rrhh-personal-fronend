import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { ABMCreateUpdateComponent } from '../../crud/abm-create-update.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { TipoSituacionService } from 'src/app/services/tm/situacion.service';

@Component({
    selector: 'app-situacion-create-update',
    templateUrl: 'situacion-create-update.html'
  })

export class SituacionCreateUpdateComponent extends ABMCreateUpdateComponent {

    titulo = 'Situacion Laboral';
    modelName = 'tipo-situacion';
    
    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private tipoSituacionService: TipoSituacionService)
    {
        super(router, route, location, plex, formBuilder, objectService)
    }

    protected get dataService(){
        return this.tipoSituacionService;
    }

    protected initForm(){
        return this.formBuilder.group({
            _id                 : [ this.object._id ],
            nombre              : [ this.object.nombre ],
            requiereVencimiento : [ this.object.requiereVencimiento ],
            activo              : [ this.object.activo ]
        });
    }
}