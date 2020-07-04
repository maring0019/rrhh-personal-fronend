import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { ABMCreateUpdateComponent } from '../../crud/abm-create-update.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { GuardiaLoteService } from 'src/app/services/guardia-lote.service';
import { AgrupamientoService } from 'src/app/services/agrupamiento.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import * as enumerados from 'src/app/models/enumerados';
import { GuardiaLote } from 'src/app/models/GuardiaLote';


@Component({
    selector: 'app-guardia-lote-create-update',
    templateUrl: 'guardia-lotes-create-update.html'
  })

export class GuardiaLotesCreateUpdateComponent extends ABMCreateUpdateComponent {

    titulo = 'Guardia Lotes';

    // Form select options
    public tipoGuardiaOpciones = enumerados.getObjTipos(enumerados.TipoGuardia);
    public servicioOpciones$ = this.servicioService.get({});
    public categoriaOpciones$ = this.categoriaService.get({});
    
    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected location: Location,
        protected plex: Plex,
        protected formBuilder: FormBuilder,
        protected objectService: ObjectService,
        private guardiaLoteService: GuardiaLoteService,
        private servicioService: UbicacionService,
        private categoriaService: AgrupamientoService)
    {
        super(router, route, location, plex, formBuilder, objectService)
    }

    protected get dataService(){
        return this.guardiaLoteService;
    }

    protected initForm(){
        return this.formBuilder.group({
            _id           : [this.object._id],
            numero        : [this.object.numero],
            servicio      : [this.object.servicio],
            tipoGuardia   : [this.object.tipoGuardia],
            categoria     : [this.object.categoria]
        });
    }

    preAdd(object){
        return new GuardiaLote(object);
    }

    preUpdate(object){
        return new GuardiaLote(object);
    }

}