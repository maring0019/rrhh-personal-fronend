import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { Agente } from 'src/app/models/Agente';
import { CausaBaja } from 'src/app/models/CausaBaja';

import { CausaBajaService } from 'src/app/services/causa-baja.service';
import { AgenteService } from 'src/app/services/agente.service';
import { AgenteDatosNormaLegalComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-norma-legal/agente-datos-norma-legal.component';
import { NormaLegal } from 'src/app/models/NormaLegal';

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
    @ViewChild(AgenteDatosNormaLegalComponent) datosNormaLegal: AgenteDatosNormaLegalComponent;

    public form: FormGroup;    
    public causas: CausaBaja[] = [];

    public normaLegal:NormaLegal = new NormaLegal();
    
    constructor(
        private formBuilder: FormBuilder,
        private causaService: CausaBajaService,
        private agenteService: AgenteService){}

    ngOnInit() {
        this.initFormSelectOptions();
        this.form = this.initForm(); 
    }

    initFormSelectOptions(){
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
                causa              : []
            });
        }
  

    public cancelar(){
        this.resetForms();
        this.cancel.emit();
    }

    public guardar(){
        if (this.form.invalid || this.datosNormaLegal.datosNormaLegalForm.invalid) {
            formUtils.markFormAsInvalid(this.form);
            formUtils.markFormAsInvalid(this.datosNormaLegal.datosNormaLegalForm)
            return;
        }

        let datosBaja = {
            fecha: this.form.value.fecha,
            causa: this.form.value.causa,
            normaLegal : new NormaLegal(this.datosNormaLegal.datosNormaLegalForm.value)
        }
        this.agenteService.baja(this.agente, datosBaja)
            .subscribe(
                data=> {
                    this.success.emit(data);
                    this.resetForms();
                },
                error => this.error.emit(error)
            )
    }

    public resetForms(){
        formUtils.resetForm(this.form, this._form);
        this.datosNormaLegal.resetForm();
    }
}