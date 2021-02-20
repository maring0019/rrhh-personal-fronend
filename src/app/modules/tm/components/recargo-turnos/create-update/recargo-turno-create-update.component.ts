import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { ABMCreateUpdateComponent } from '../../crud/abm-create-update.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { RecargoTurnoService } from 'src/app/services/recargo-turno.service';

@Component({
    selector: 'app-recargo-turno-create-update',
    templateUrl: 'recargo-turno-create-update.html'
  })

export class RecargoTurnoCreateUpdateComponent extends ABMCreateUpdateComponent {

    titulo = 'Turnos - Recargos';
    modelName = 'recargo-turno';
    
    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private recargoTurnoService: RecargoTurnoService)
    {
        super(router, route, location, plex, formBuilder, objectService)
    }

    protected get dataService(){
        return this.recargoTurnoService;
    }

    protected initForm(){
        return this.formBuilder.group({
            _id            : [this.object._id],
            nombre         : [this.object.nombre],
            observaciones  : [this.object.observaciones],

        });
    }
}