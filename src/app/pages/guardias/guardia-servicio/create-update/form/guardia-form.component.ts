import { Output, EventEmitter, OnInit, ViewChild, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { pairwise, startWith } from 'rxjs/operators';

import  *  as formUtils from 'src/app/utils/formUtils';
import { Guardia } from 'src/app/models/Guardia';

import { GuardiaPeriodoService } from 'src/app/services/guardia-periodo.service';
import { Auth } from 'src/app/services/auth.service';
import { GuardiaLoteService } from 'src/app/services/guardia-lote.service';


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
    public periodoOpciones$ = this.guardiaPeriodoService.get({});
    public loteOpciones$ = this.getLoteOptions();

    
    constructor(
        public formBuilder: FormBuilder,
        private authService: Auth,
        private guardiaLoteService: GuardiaLoteService,
        private guardiaPeriodoService: GuardiaPeriodoService
    ){}

    ngOnInit() {
        this.initFormSelectOptions();
        this.form = this.initForm();
        this.subscribeFormValueChanges();            
    }


    private initFormSelectOptions(){}

    public getLoteOptions(){
        const loteSearchParams = {
            'servicio._id': this.authService.servicios.map(i=>i._id),
        }
        return this.guardiaLoteService.get(loteSearchParams);
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
            _id             : [this.guardia._id],
            periodo         : [this.guardia.periodo],
            lote            : [this.guardia.lote._id? this.guardia.lote:null],
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