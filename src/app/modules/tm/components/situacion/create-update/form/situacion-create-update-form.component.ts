import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormGroup } from '@angular/forms';

import  *  as formUtils from 'src/app/utils/formUtils';

import { TipoSituacionService } from 'src/app/services/tm/situacion.service';
import { TipoSituacion } from 'src/app/models/TipoSituacion';

@Component({
    selector: 'app-situacion-create-update-form',
    templateUrl: './situacion-create-update-form.html'
  })

export class TipoSituacionCreateUpdateFormComponent  implements OnInit {
    
    @Input() object: TipoSituacion;
    @Input() titulo: String = 'Titulo';
    @Input() subtitulo: String = 'Subtitulo';

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FormGroupDirective) _form;

    public form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public objectService: TipoSituacionService,
    ){}

    ngOnInit() { 
        this.form = this.initForm(); 
    }

    initForm(){
        return this.formBuilder.group({
            _id                 : [ this.object._id ],
            nombre              : [ this.object.nombre ],
            requiereVencimiento : [ this.object.requiereVencimiento ],
            activo              : [ this.object.activo ]
        });
    }

    public cancelar(){
        formUtils.resetForm(this.form, this._form);
        this.cancel.emit();
    }


    private invalid(){
        formUtils.markFormAsInvalid(this.form);
        return this.form.invalid 
    }

    public guardar(){
        if (this.invalid()) return;
        const object = this.form.value;
        if (this.object._id){
            this.update(object);
        }
        else{
            this.add(object);
        }
    }
    
    private update(object){
        this.objectService.put(object)
            .subscribe(
                data=> {
                    this.success.emit(data);
                    formUtils.resetForm(this.form, this._form);
                },
                error => this.error.emit(error)
            );
    }

    private add(object){
        this.objectService.post(object)
            .subscribe(
                data=> {
                    this.success.emit(data);
                    formUtils.resetForm(this.form, this._form);
                },
                error => this.error.emit(error)
            );
    }
}