import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { ABMCreateUpdateComponent } from '../../crud/abm-create-update.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { RecargoJustificacionService } from 'src/app/services/recargo-justificacion.service';

@Component({
    selector: 'app-recargo-justificacion-create-update',
    templateUrl: 'recargo-justificacion-create-update.html'
  })

export class RecargoJustificacionCreateUpdateComponent extends ABMCreateUpdateComponent {

    titulo = 'Turnos - Recargos';
    modelName = 'recargo-justificacion';
    
    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private recargoJustificacionService: RecargoJustificacionService)
    {
        super(router, route, location, plex, formBuilder, objectService)
    }

    protected get dataService(){
        return this.recargoJustificacionService;
    }

    protected initForm(){
        return this.formBuilder.group({
            _id            : [this.object._id],
            nombre         : [this.object.nombre],
            observaciones  : [this.object.observaciones],

        });
    }
}