import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { Agente } from 'src/app/models/Agente';
import { NormaLegal } from 'src/app/models/NormaLegal';
import { ReactivacionAgente } from 'src/app/models/ReactivacionAgente';

import { AgenteDatosNormaLegalComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-norma-legal/agente-datos-norma-legal.component';

@Component({
    selector: 'app-agente-reactivar-form',
    templateUrl: './agente-reactivar-form.html'
  })

export class AgenteReactivarFormComponent implements OnInit, OnChanges {
    @Input() agente: Agente;
    @Input() reactivacion: ReactivacionAgente = new ReactivacionAgente();
    @Input() editable: Boolean = true;

    @ViewChild(FormGroupDirective) _form;
    @ViewChild(AgenteDatosNormaLegalComponent) datosNormaLegal: AgenteDatosNormaLegalComponent;

    // Form data
    public form: FormGroup;    

    public normaLegal:NormaLegal;
    
    constructor(private formBuilder: FormBuilder){}

    ngOnInit() {
        this.initComponentData();
    }

    ngOnChanges(changes:any){
        if (changes['reactivacion'] && !changes['reactivacion'].isFirstChange()){
            this.initComponentData();
        } 
    }

    initComponentData(){
        this.initForm();
        this.normaLegal = this.reactivacion.normaLegal;
    }
    
    initForm(){
        this.form = this.formBuilder.group({
            fecha    : [ this.reactivacion.fecha? this.reactivacion.fecha : new Date()],
            motivo   : [ this.reactivacion.motivo ]
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