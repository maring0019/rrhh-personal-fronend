import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { Feriado } from 'src/app/models/Feriado';
import { FeriadoService } from 'src/app/services/feriado.service';
import { CrudCreateFormComponent } from 'src/app/modules/tm/components/crud/create/form/crud-create-form.component';


@Component({
    selector: 'app-feriado-create-form',
    templateUrl: './feriado-create-form.html'
  })

export class FeriadoCreateFormComponent extends CrudCreateFormComponent implements OnInit, AfterViewInit {

    protected object: Feriado;
    public form: FormGroup;
        
    constructor(
        public formBuilder: FormBuilder,
        public objectService: FeriadoService,
    ){
        super(formBuilder, objectService);
    }

    ngOnInit() {
        // this.initFormSelectOptions();
        this.object = new Feriado();
        this.form = this.initForm(); 
    }

    ngAfterViewInit(){
        this.form.patchValue({ fecha: this.form.value.fecha });
    }

    initForm()
        {
            return this.formBuilder.group({
                id                 : [this.object.id],
                fecha              : [this.object.fecha],
                descripcion        : [this.object.descripcion],
            });
        }
  

    public guardar(){
        const feriado = new Feriado(this.form.value);
        this.objectService.post(feriado)
            .subscribe(
                data=> {
                    this.success.emit(data);
                    formUtils.resetForm(this.form, this._form);
                },
                error => this.error.emit(error)
            )
    }

}