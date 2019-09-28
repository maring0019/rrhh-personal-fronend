import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { CrudUpdateFormComponent } from 'src/app/modules/tm/components/crud/create-update/form/crud-update-form.component';
import { TipoSituacionService } from 'src/app/services/tm/situacion.service';

@Component({
    selector: 'app-situacion-update-form',
    templateUrl: './situacion-form.html'
  })

export class SituacionUpdateFormComponent extends CrudUpdateFormComponent implements OnInit {
    
    // public form: FormGroup;
    public titulo = 'Situacion'
    public subtitulo = 'Editar'

    constructor(
        public formBuilder: FormBuilder,
        public objectService: TipoSituacionService,
        public route: ActivatedRoute
    ){
        super(formBuilder, objectService, route);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    initForm(){
        return this.formBuilder.group({
            id                  : [this.object.id],
            nombre              : [this.object.nombre],
            requiereVencimiento : [this.object.requiereVencimiento]
        });
    }

}