import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { Feriado } from 'src/app/models/Feriado';

@Component({
    selector: 'app-crud-create-form',
    templateUrl: './crud-create-form.html'
  })

export abstract class CrudCreateFormComponent implements OnInit, AfterViewInit {
    
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FormGroupDirective) _form;

    protected object: Feriado;
    public form: FormGroup;
    
    constructor(
        public formBuilder: FormBuilder,
        public objectService: any,
    ){}

    ngOnInit() {
        // this.initFormSelectOptions();
        // this.object = new Feriado();
        // this.form = this.initForm(); 
    }

    ngAfterViewInit(){
        // this.form.patchValue({ fecha: this.form.value.fecha });
    }

    /**
     * Override this
     */
    protected initFormSelectOptions(){
    }
    
    /**
     * Override this
     */
    protected initForm(){
        return this.formBuilder.group({});
    }
    
    /**
     * Override this
     */
    protected guardar(){
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
        this.guardar();
    }   
}