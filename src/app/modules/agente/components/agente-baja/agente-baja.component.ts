import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { Agente } from 'src/app/models/Agente';
import { BajaAgente } from 'src/app/models/BajaAgente';
import { CausaBaja } from 'src/app/models/CausaBaja';
import { TipoNormaLegal } from 'src/app/models/TipoNormaLegal';

import { TipoNormaLegalService } from 'src/app/services/tipo-norma-legal.service';
import { CausaBajaService } from 'src/app/services/causa-baja.service';
import { AgenteService } from 'src/app/services/agente.service';

@Component({
    selector: 'app-agente-baja',
    templateUrl: './agente-baja.html'
  })

export class AgenteBajaComponent implements OnInit {
    @Input() agente: Agente;

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FormGroupDirective) _form;


    public form: FormGroup;
    public tiposNormaLegal: TipoNormaLegal[] = [];
    public causas: CausaBaja[] = [];

    
    constructor(
        private formBuilder: FormBuilder,
        private tipoNormaLegalService: TipoNormaLegalService,
        private causaService: CausaBajaService,
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
        // Init Causas de Bajas
        this.causaService.get({})
            .subscribe(data => {
                this.causas = data;
            });
    }
    
    initForm()
        {
            return this.formBuilder.group({
                fecha              : [new Date()],
                causa              : [],
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
        const baja = new BajaAgente(this.form.value);
        this.agenteService.baja(this.agente, baja)
            .subscribe(
                data=> {
                    this.success.emit(data);
                    formUtils.resetForm(this.form, this._form);
                },
                error => this.error.emit(error)
            )
    }
}