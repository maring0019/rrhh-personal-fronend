import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FeriadoService } from 'src/app/services/feriado.service';
import { CrudUpdateFormComponent } from 'src/app/modules/tm/components/crud/create-update/form/crud-update-form.component';
import { Feriado } from 'src/app/models/Feriado';

@Component({
    selector: 'app-feriado-update-form',
    templateUrl: './feriado-form.html'
  })

export class FeriadoUpdateFormComponent extends CrudUpdateFormComponent implements OnInit {
    
    public form: FormGroup;
    public titulo = 'Feriado';
    public subtitulo = 'Editar';


    constructor(
        public formBuilder: FormBuilder,
        public route: ActivatedRoute,
        private objectService: FeriadoService,
    ){
        super(formBuilder, route);
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


    getDataToUpdate(objID):Observable<Feriado>{
        return this.objectService.getByID(objID);
    }

    guardar(object):Observable<Feriado>{
        return this.objectService.put(object);
            // .subscribe(
            //     data=> {
            //         this.success.emit(data);
            //         // formUtils.resetForm(this.form, this._form);
            //     },
            //     error => this.error.emit(error)
            // )
    }
}