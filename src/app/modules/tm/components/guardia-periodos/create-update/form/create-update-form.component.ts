import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormGroup } from '@angular/forms';

import  *  as formUtils from 'src/app/utils/formUtils';

import { GuardiaPeriodoService } from 'src/app/services/guardia-periodo.service';
import { GuardiaPeriodo } from 'src/app/models/GuardiaPeriodos';

@Component({
    selector: 'app-guardia-periodo-create-update-form',
    templateUrl: './create-update-form.html'
  })

export class GuardiaPeriodoCreateUpdateFormComponent  implements OnInit {
    
    @Input() object: GuardiaPeriodo;
    @Input() titulo: String = 'Titulo';
    @Input() subtitulo: String = 'Subtitulo';

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
        formUtils.patchFormDates(this.form);
    }

    initForm(){
        return this.formBuilder.group({
            _id                   : [ this.object._id ],
            fechaDesde            : [ this.object.fechaDesde ],
            fechaHasta            : [ this.object.fechaHasta ],
            nombre                : [ this.object.nombre ]
        });
    }

    /**
     * Actualiza el campo nombre del formulario ante cualquier cambio de
     * los campos fechaDesde o fechaHasta. Es una facilidad para evitarle
     * al usuario ingresar un nombre arbitrario.
     */
    public updateNombre(){
        let nombre = '';
        const fd = this.form.value.fechaDesde;
        const fh = this.form.value.fechaHasta;
        if (fd) nombre += moment(fd).utc().format('MMMM/YYYY').toUpperCase();
        if (fh) nombre += ' - ' + moment(fh).utc().format('MMMM/YYYY').toUpperCase();
        this.form.patchValue( { nombre: nombre });
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