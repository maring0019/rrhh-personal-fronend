import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CrudCreateFormComponent } from 'src/app/modules/tm/components/crud/create-update/form/crud-create-form.component';
import { TipoSituacionService } from 'src/app/services/tm/situacion.service';



@Component({
    selector: 'app-situacion-create-form',
    templateUrl: './situacion-form.html'
  })

export class SituacionCreateFormComponent extends CrudCreateFormComponent implements OnInit {
    
    // public form: FormGroup;
    public titulo = 'Situacion'
    public subtitulo = 'Alta'

    constructor(
        public formBuilder: FormBuilder,
        public objectService: TipoSituacionService,
    ){
        super(formBuilder, objectService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    initForm()
        {
            return this.formBuilder.group({
                nombre              : [],
                requiereVencimiento : []
            });
        }
}