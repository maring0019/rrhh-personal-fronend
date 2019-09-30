import { Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';


export abstract class CrudCreateFormComponent implements OnInit {
    
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FormGroupDirective) _form;

    public form: FormGroup;
    
    constructor(public formBuilder: FormBuilder){}

    ngOnInit() {
        this.initFormSelectOptions();
        this.form = this.initForm(); 
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
    
    
    abstract guardar(object):Observable<any>;


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