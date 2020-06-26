import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { ABMCreateUpdateComponent } from '../../crud/abm-create-update.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { IndicadorLicenciaService } from 'src/app/services/indicador-licencia.service';

@Component({
    selector: 'app-licencia-periodo-create-update',
    templateUrl: 'licencia-periodo-create-update.html'
  })

export class LicenciaPeriodoCreateUpdateComponent extends ABMCreateUpdateComponent {

    titulo = 'Licencia Periodos';
    
    constructor(
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private indicadorLicenciaService: IndicadorLicenciaService)
    {
        super(route, location, plex, formBuilder, objectService)
    }

    protected get dataService(){
        return this.indicadorLicenciaService;
    }

    protected initForm(){
        let agente = this.object.agente;
        return this.formBuilder.group({
            _id          : [this.object._id],
            agente       : [this.object.agente? `${agente.apellido}, ${agente.nombre}`: null],
            vigencia     : [this.object.vigencia],
            totales      : [this.object.totales],
            ejecutadas   : [this.object.ejecutadas]
        });
    }
}