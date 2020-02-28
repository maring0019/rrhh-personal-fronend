import { Output, EventEmitter, OnInit, ViewChild, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { pairwise, startWith } from 'rxjs/operators';

import { Auth } from '@andes/auth';
import  *  as formUtils from 'src/app/utils/formUtils';
import * as enumerados from 'src/app/models/enumerados';
import { Guardia } from 'src/app/models/Guardia';

import { AgrupamientoService } from 'src/app/services/agrupamiento.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { GuardiaPeriodoService } from 'src/app/services/guardia-periodo.service';


@Component({
    selector: 'app-guardia-form',
    templateUrl: './guardia-form.html'
  })
export class GuardiaFormComponent implements OnInit {
    
    @Input() guardia: Guardia;
    @Input() editable: Boolean = true;
    
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();
    @Output() changed: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FormGroupDirective) _form;

    public form: FormGroup;

    // Form select options
    public tipoGuardiaOpciones = enumerados.getObjTipos(enumerados.TipoGuardia);
    public periodoOpciones$ = this.guardiaPeriodoService.get({});
    public servicioOpciones$ = this.servicioService.getByUserID({ userID : this.authService.usuario._id });
    public categoriaOpciones$ = this.categoriaService.get({});

    
    constructor(
        public formBuilder: FormBuilder,
        private authService: Auth,
        private servicioService: UbicacionService,
        private categoriaService: AgrupamientoService,
        private guardiaPeriodoService: GuardiaPeriodoService
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
        const lote = this.guardia.lote;
        return this.formBuilder.group({
            _id             : [this.guardia._id],
            periodo         : [this.guardia.periodo],
            servicio        : [lote? lote.servicio:null],
            categoria       : [lote? lote.categoria:null],
            tipoGuardia     : [lote? lote.tipoGuardia:null]
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