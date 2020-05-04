import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { Agente } from 'src/app/models/Agente';
import { NormaLegal } from 'src/app/models/NormaLegal';
import { BajaAgente } from 'src/app/models/BajaAgente';

import { CausaBajaService } from 'src/app/services/causa-baja.service';

import { AgenteDatosNormaLegalComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-norma-legal/agente-datos-norma-legal.component';


@Component({
    selector: 'app-agente-baja-form',
    templateUrl: './agente-baja-form.html'
  })

export class AgenteBajaFormComponent implements OnInit, OnChanges {
    @Input() agente: Agente;
    @Input() baja: BajaAgente = new BajaAgente();
    @Input() editable: Boolean = true;

    @ViewChild(FormGroupDirective) _form;
    @ViewChild(AgenteDatosNormaLegalComponent) datosNormaLegal: AgenteDatosNormaLegalComponent;

    // Form data
    public form: FormGroup;
    public causas$ = this.causaService.get({});    

    public normaLegal:NormaLegal;
    
    constructor(
        private formBuilder: FormBuilder,
        private causaService: CausaBajaService){}

    ngOnInit() {
        this.initComponentData();
    }

    ngOnChanges(changes:any){
        if (changes['baja'] && !changes['baja'].isFirstChange()){
            this.initComponentData();
        } 
    }

    initComponentData(){
        this.initForm();
        this.normaLegal = this.baja.normaLegal;
    }
    
    initForm(){
        this.form = this.formBuilder.group({
            fecha    : [ this.baja.fecha? this.baja.fecha : new Date()],
            motivo   : [ this.baja.motivo ]
        });
    }
  
    public invalid(){
        let invalid = false;
        if (this.form.invalid || this.datosNormaLegal.datosNormaLegalForm.invalid) {
            formUtils.markFormAsInvalid(this.form);
            formUtils.markFormAsInvalid(this.datosNormaLegal.datosNormaLegalForm)
            invalid = true;
        }
        return invalid;
    }

    public values(){
        let datosBaja = {
            fecha: this.form.value.fecha,
            motivo: this.form.value.motivo,
            normaLegal : new NormaLegal(this.datosNormaLegal.datosNormaLegalForm.value)
        }
        return datosBaja;
    }

    public resetForms(){
        formUtils.resetForm(this.form, this._form);
        this.datosNormaLegal.resetForm();
    }
}