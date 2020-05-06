import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { Agente } from 'src/app/models/Agente';
import { HistoriaAgenteSituacion } from 'src/app/models/HistoriaAgenteSituacion';
import { NormaLegal } from 'src/app/models/NormaLegal';
import { Situacion } from 'src/app/models/Situacion';
import { Cargo } from 'src/app/models/Cargo';
import { Regimen } from 'src/app/models/Regimen';

import { AgenteDatosNormaLegalComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-norma-legal/agente-datos-norma-legal.component';
import { AgenteDatosSituacionComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-situacion/agente-datos-situacion.component';
import { AgenteDatosCargoComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-cargo/agente-datos-cargo.component';
import { AgenteDatosRegimenComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-regimen/agente-datos-regimen.component';

@Component({
    selector: 'app-historia-laboral-form',
    templateUrl: './historia-laboral-form.html'
  })

export class HistoriaLaboralFormComponent implements OnInit, OnChanges {
    @Input() agente: Agente;
    @Input() historia: HistoriaAgenteSituacion = new HistoriaAgenteSituacion();
    @Input() editable: Boolean = true;

    @ViewChild(AgenteDatosNormaLegalComponent) datosNormaLegal: AgenteDatosNormaLegalComponent;
    @ViewChild(AgenteDatosSituacionComponent) datosSituacion: AgenteDatosSituacionComponent;
    @ViewChild(AgenteDatosCargoComponent) datosCargo: AgenteDatosCargoComponent;
    @ViewChild(AgenteDatosRegimenComponent) datosRegimen: AgenteDatosRegimenComponent;
    @ViewChild(FormGroupDirective) _form;
     
    // Form data
    public form: FormGroup;
    // Datos para los formularios
    public normaLegal: NormaLegal;
    public situacion: Situacion;
    public cargo: Cargo;
    public regimen: Regimen;   
    
    constructor(private formBuilder: FormBuilder){}

    ngOnInit() {
        this.initComponentData();
    }

    ngOnChanges(changes:any){
        if ((changes['historia'] && !changes['historia'].isFirstChange())||
            (changes['agente'] && !changes['agente'].isFirstChange())){
            this.initComponentData();
        } 
    }

    initComponentData(){
        this.initForm();
        this.situacion = this.historia.situacion;
        this.normaLegal = this.historia.normaLegal;
        this.cargo = this.historia.cargo;
        this.regimen = this.historia.regimen;
    }
    
    initForm(){
        this.form = this.formBuilder.group({
            fecha    : [ this.historia.fecha? this.historia.fecha : new Date()],
            motivo   : [ this.historia.motivo ]
        });
    }
  
    public invalid(){
        const forms:any = [
            this.form,
            this.datosNormaLegal.datosNormaLegalForm,
            this.datosSituacion.datosSituacionForm,
            this.datosCargo.datosCargoForm,
            this.datosRegimen.datosRegimenForm
            ]
        
        let existInvalidForms = false;
        for (const f of forms) {
            if (f.invalid){
                existInvalidForms = true;
                formUtils.markFormAsInvalid(f);
            }
        }
        return existInvalidForms;
    }

    public values(){
        let datosHistoria = {
            fecha: this.form.value.fecha,
            motivo: this.form.value.motivo,
            normaLegal : new NormaLegal(this.datosNormaLegal.datosNormaLegalForm.value),
            situacion : new Situacion(this.datosSituacion.datosSituacionForm.value),
            cargo: new Cargo(this.datosCargo.datosCargoForm.value),
            regimen : new Regimen(this.datosRegimen.datosRegimenForm.value)
        }
        return datosHistoria;
    }

    public resetForms(){
        formUtils.resetForm(this.form, this._form);
        this.datosNormaLegal.resetForm();
        this.datosSituacion.resetForm();
        this.datosCargo.resetForm();
        this.datosRegimen.resetForm();
    }
}