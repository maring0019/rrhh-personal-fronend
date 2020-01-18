import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { Agente } from 'src/app/models/Agente';
import { TipoNormaLegal } from 'src/app/models/TipoNormaLegal';

import { TipoNormaLegalService } from 'src/app/services/tipo-norma-legal.service';
import { AgenteService } from 'src/app/services/agente.service';


@Component({
    selector: 'app-agente-reactivar',
    templateUrl: './agente-reactivar.html'
  })

export class AgenteReactivarComponent implements OnInit {
    @Input() agente: Agente;

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FormGroupDirective) _form;


    public form: FormGroup;
    public tiposNormaLegal: TipoNormaLegal[] = [];
    
    constructor(
        private formBuilder: FormBuilder,
        private tipoNormaLegalService: TipoNormaLegalService,
        private agenteService: AgenteService){}

    ngOnInit() {
        this.initFormSelectOptions();
        this.form = this.initForm(); 
    }

    initFormSelectOptions(){
        // Init Tipos Normas
        this.tipoNormaLegalService.get({})
            .subscribe(data => {
                this.tiposNormaLegal = data;
            });
    }
    
    initForm()
        {
            return this.formBuilder.group({
                fecha              : [new Date()],
                tipoNormaLegal     : [],
                numeroNormaLegal   : [],
                observaciones      : []
            });
        }
  

    public cancelar(){
        formUtils.resetForm(this.form, this._form);
        this.cancel.emit();
    }


    public guardar(){
        if (this.form.invalid){
            formUtils.markFormAsInvalid(this.form);
            return;
        }
        
        this.agenteService.reactivar(this.agente)
            .subscribe(
                data=> {
                    this.success.emit(data);
                    formUtils.resetForm(this.form, this._form);
                },
                error => this.error.emit(error)
            )
    }
}