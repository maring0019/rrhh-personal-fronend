import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FeriadoService } from 'src/app/services/feriado.service';
import { CrudCreateFormComponent } from 'src/app/modules/tm/components/crud/create-update/form/crud-create-form.component';



@Component({
    selector: 'app-feriado-create-form',
    templateUrl: './feriado-form.html'
  })

export class FeriadoCreateFormComponent extends CrudCreateFormComponent implements OnInit {
    
    public form: FormGroup;
    public titulo = 'Feriado'
    public subtitulo = 'Alta'

    constructor(
        public formBuilder: FormBuilder,
        public objectService: FeriadoService,
    ){
        super(formBuilder, objectService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    initForm()
        {
            return this.formBuilder.group({
                fecha        : [],
                descripcion  : [],
            });
        }
}