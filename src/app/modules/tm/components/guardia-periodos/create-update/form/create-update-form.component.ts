import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import  *  as formUtils from 'src/app/utils/formUtils';

import { GuardiaPeriodoService } from 'src/app/services/guardia-periodo.service';
import { GuardiaPeriodo } from 'src/app/models/GuardiaPeriodos';



@Component({
    selector: 'app-guardia-periodo-create-update-form',
    templateUrl: './create-update-form.html'
  })

export class GuardiaPeriodoCreateUpdateFormComponent  implements OnInit {
    
    @Input() object:GuardiaPeriodo;
    @Input() titulo:String = 'Titulo';
    @Input() subtitulo:String = 'Subtitulo';

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FormGroupDirective) _form;

    public form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public objectService: GuardiaPeriodoService,
    ){}

    ngOnInit() { 
        this.form = this.initForm(); 
    }

    initForm(){
        return this.formBuilder.group({
            fechaDesde            : [ this.object.fechaDesde ],
            fechaHasta            : [ this.object.fechaHasta ],
            nombre                : [ this.object.nombre ]
        });
    }

    guardar(object):Observable<GuardiaPeriodo>{
        return this.objectService.post(object);
    }

    public cancelar(){
        formUtils.resetForm(this.form, this._form);
        this.cancel.emit();
    }


    public invalid(){
        if (this.form.invalid){
            formUtils.markFormAsInvalid(this.form);
            return true;
        }
        else {
            return false;
        }
    }

    public aceptar(){
        if (this.invalid()) return;
        const object = this.form.value;
        this.guardar(object)
            .subscribe(
                data=> {
                    this.success.emit(data);
                    formUtils.resetForm(this.form, this._form);
                },
                error => this.error.emit(error)
            )
    } 
}