import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FeriadoService } from 'src/app/services/feriado.service';
import { CrudUpdateFormComponent } from 'src/app/modules/tm/components/crud/create-update/form/crud-update-form.component';

@Component({
    selector: 'app-feriado-update-form',
    templateUrl: './feriado-form.html'
  })

export class FeriadoUpdateFormComponent extends CrudUpdateFormComponent implements OnInit {
    
    public form: FormGroup;
    public titulo = 'Feriado'
    public subtitulo = 'Editar'

    constructor(
        public formBuilder: FormBuilder,
        public objectService: FeriadoService,
        public route: ActivatedRoute
    ){
        super(formBuilder, objectService, route);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    initForm(){
        return this.formBuilder.group({
            id                 : [this.object.id],
            fecha              : [this.object.fecha],
            descripcion        : [this.object.descripcion],
        });
    }

    patchFormValues(){
        this.form.patchValue({ fecha: this.form.value.fecha });    
    }
}