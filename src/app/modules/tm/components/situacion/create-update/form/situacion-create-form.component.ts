import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { CrudCreateFormComponent } from 'src/app/modules/tm/components/crud/create-update/form/crud-create-form.component';
import { TipoSituacionService } from 'src/app/services/tm/situacion.service';
import { TipoSituacion } from 'src/app/models/TipoSituacion';


@Component({
    selector: 'app-situacion-create-form',
    templateUrl: './situacion-form.html'
  })

export class SituacionCreateFormComponent extends CrudCreateFormComponent implements OnInit {
    
    public titulo = 'Situacion'
    public subtitulo = 'Alta'

    constructor(
        public formBuilder: FormBuilder,
        private objectService: TipoSituacionService,
    ){
        super(formBuilder);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    initForm(){
        return this.formBuilder.group({
            nombre              : [],
            requiereVencimiento : []
        });
    }

    guardar(object):Observable<TipoSituacion>{
        return this.objectService.post(object);
    }
}