import { Output, EventEmitter, OnInit, ViewChild, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import  *  as formUtils from 'src/app/utils/formUtils';

import * as enumerados from 'src/app/models/enumerados';
import { Guardia } from 'src/app/models/Guardia';
import { ServicioService } from 'src/app/services/servicio.service';
import { AgrupamientoService } from 'src/app/services/agrupamiento.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';


@Component({
    selector: 'app-guardia-form',
    templateUrl: './guardia-form.html'
  })
export class GuardiaFormComponent implements OnInit {
    
    @Input() guardia: Guardia;
    
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FormGroupDirective) _form;

    public form: FormGroup;

    // Form select options
    public tipoGuardiaOpciones = enumerados.getObjTipos(enumerados.TipoGuardia);
    public periodoOpciones$ = this.categoriaService.get({});
    public servicioOpciones$ = this.servicioService.getByUserID({});
    public categoriaOpciones$ = this.categoriaService.get({});

    
    constructor(
        public formBuilder: FormBuilder,
        private servicioService: UbicacionService,
        private categoriaService: AgrupamientoService   
    ){}

    ngOnInit() {
        this.initFormSelectOptions();
        this.form = this.initForm(); 
    }


    private initFormSelectOptions(){

    }

    
    private initForm(){
        return this.formBuilder.group({
            id              : [this.guardia.id],
            periodo         : [this.guardia.periodo],
            servicio        : [this.guardia.servicio],
            categoria       : [this.guardia.categoria],
            tipoGuardia     : [this.guardia.tipoGuardia]
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