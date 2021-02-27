import { Output, EventEmitter, OnInit, ViewChild, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { pairwise, startWith } from 'rxjs/operators';

import  *  as formUtils from 'src/app/utils/formUtils';

import { Auth } from 'src/app/services/auth.service';
import { getMesesOptions, getAniosOptions } from 'src/app/models/enumerados';
import { HoraExtra } from 'src/app/models/HoraExtra';


@Component({
    selector: 'app-hora-extra-form',
    templateUrl: './hora-extra-form.html'
  })
export class HoraExtraFormComponent implements OnInit {
    
    @Input() horaExtra: HoraExtra;
    @Input() editable: Boolean = true;
    
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();
    @Output() changed: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FormGroupDirective) _form;

    public form: FormGroup;

    // Form select options
    public mesOpciones = getMesesOptions();
    public anioOpciones = getAniosOptions();
    public servicioOpciones = this.authService.servicios;
    
    constructor(
        public formBuilder: FormBuilder,
        private authService: Auth
    ){}

    ngOnInit() {
        this.initFormSelectOptions();
        this.form = this.initForm();
        this.subscribeFormValueChanges();            
    }


    private initFormSelectOptions(){

    }

    /**
     * Nos subscribimos a cada cambio que se realice en cada uno
     * de los controles del form. Notificamos solo el nuevo valor
     * del control modificado (es decir no se notifica el form
     * completo)
     */
    private subscribeFormValueChanges(){
        Object.keys(this.form.controls).forEach( key => {
            this.form.get(key).valueChanges
                .pipe(startWith(null), pairwise())
                .subscribe(([prev, next]: [any, any]) => {
                    this.changed.emit({ [key] : next });
            });
        });
    }

    private initForm(){
        return this.formBuilder.group({
            _id       : [this.horaExtra._id],
            mes       : [this.horaExtra.mes],
            anio      : [this.horaExtra.anio],
            servicio  : [this.horaExtra.servicio],
        });
    }
    
    
    guardar(object):Observable<any>{
        return;
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