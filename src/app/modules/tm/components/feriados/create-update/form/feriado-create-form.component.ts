import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { FeriadoService } from 'src/app/services/feriado.service';
import { CrudCreateFormComponent } from 'src/app/modules/tm/components/crud/create-update/form/crud-create-form.component';
import { Feriado } from 'src/app/models/Feriado';



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
        public objectService: FeriadoService)
    {
        super(formBuilder);
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
    
    guardar(object):Observable<Feriado>{
        return this.objectService.post(object);
            // .post(object)
            // .subscribe(
            //     data=> {
            //         this.success.emit(data);
            //         // formUtils.resetForm(this.form, this._form);
            //     },
            //     error => this.error.emit(error)
            // )
    }
}