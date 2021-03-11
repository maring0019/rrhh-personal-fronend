import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { ABMCreateUpdateComponent } from '../../crud/abm-create-update.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { SubPuestoService } from 'src/app/services/subpuesto.service';

@Component({
    selector: 'app-subpuesto-create-update',
    templateUrl: 'subpuesto-create-update.html'
  })

export class SubPuestoCreateUpdateComponent extends ABMCreateUpdateComponent {

    titulo = 'Organigrama - Sub-Puestos';
    modelName = 'subpuesto';
    
    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private subpuestoService: SubPuestoService)
    {
        super(router, route, location, plex, formBuilder, objectService)
    }

    protected get dataService(){
        return this.subpuestoService;
    }

    protected initForm(){
        return this.formBuilder.group({
            _id            : [this.object._id],
            nombre         : [this.object.nombre]
        });
    }
}