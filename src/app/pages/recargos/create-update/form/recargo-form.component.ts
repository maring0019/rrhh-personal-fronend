import { Output, EventEmitter, OnInit, ViewChild, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { pairwise, startWith } from 'rxjs/operators';

import  *  as formUtils from 'src/app/utils/formUtils';

import { GuardiaPeriodoService } from 'src/app/services/guardia-periodo.service';
import { Auth } from 'src/app/services/auth.service';
import { Recargo } from 'src/app/models/Recargo';


@Component({
    selector: 'app-recargo-form',
    templateUrl: './recargo-form.html'
  })
export class RecargoFormComponent implements OnInit {
    
    @Input() recargo: Recargo;
    @Input() editable: Boolean = true;
    
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();
    @Output() changed: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FormGroupDirective) _form;

    public form: FormGroup;

    // Form select options
    public mesOpciones = [
        { id: 1, nombre: 'Enero' },
        { id: 2, nombre: 'Febrero'},
        { id: 3, nombre: 'Marzo'}
    ];
    public anioOpciones = [
        { id: 2020, nombre: '2020' },
        { id: 2021, nombre: '2021'},
        { id: 2022, nombre: '2022'}

    ];
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
            _id       : [this.recargo._id],
            mes       : [this.recargo.mes],
            anio      : [this.recargo.anio],
            servicio  : [this.recargo.servicio],
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