import { Component, OnInit, HostBinding, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Plex } from '@andes/plex';
import  *  as formUtils from 'src/app/utils/formUtils';

import { AgenteService } from 'src/app/services/agente.service';

import { AgenteDatosSituacionComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-situacion/agente-datos-situacion.component';
import { AgenteDatosCargoComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-cargo/agente-datos-cargo.component';
import { AgenteDatosRegimenComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-regimen/agente-datos-regimen.component';
import { AgenteDatosNormaLegalComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-norma-legal/agente-datos-norma-legal.component';

import { Agente } from 'src/app/models/Agente';
import { SituacionLaboral } from 'src/app/models/SituacionLaboral';
import { NormaLegal } from 'src/app/models/NormaLegal';
import { Situacion } from 'src/app/models/Situacion';
import { Cargo } from 'src/app/models/Cargo';
import { Regimen } from 'src/app/models/Regimen';


@Component({
    selector: 'app-historia-laboral-create',
    templateUrl: './historia-laboral-create.html',
    // styleUrls: ['./historia-laboral-create.scss']
  })

export class HistoriaLaboralCreateComponent implements OnInit, OnChanges {
    @Input() agente: Agente;

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(AgenteDatosNormaLegalComponent) datosNormaLegal: AgenteDatosNormaLegalComponent;
    @ViewChild(AgenteDatosSituacionComponent) datosSituacion: AgenteDatosSituacionComponent;
    @ViewChild(AgenteDatosCargoComponent) datosCargo: AgenteDatosCargoComponent;
    @ViewChild(AgenteDatosRegimenComponent) datosRegimen: AgenteDatosRegimenComponent;
     
    @HostBinding('class.plex-layout') layout = true;
    // Datos para los formularios
    
    public normaLegal: NormaLegal;
    public situacion: Situacion;
    public cargo: Cargo;
    public regimen: Regimen;

    public isEditable = true;

    private _updating:any; // To keep track actual action. If false is create
    
    constructor(
        private agenteService:AgenteService,
        public plex: Plex
        ){}

    ngOnInit() {
        this.initValueForms();
    }

    ngOnChanges(changes:any){
        if (!changes['agente'].isFirstChange()) this.initValueForms();
    }

    private initValueForms(){
        if (this._updating){
            this.situacion = this.agente.situacionLaboral.situacion;
            this.normaLegal = this.agente.situacionLaboral.normaLegal;
            this.cargo = this.agente.situacionLaboral.cargo;
            this.regimen = this.agente.situacionLaboral.regimen;
        }
        else{
            this.normaLegal = new NormaLegal();
            this.situacion = new Situacion();
            this.cargo = new Cargo();
            this.regimen = new Regimen();
        }   
    }


    allFormsValid(){
        const forms:any = [
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
        return !existInvalidForms;
    }

    save(){
        if (this.allFormsValid()){
            const situacionLaboral = this.parseHistoriaLaboral();
            if (this._updating){
                this.updateHistoriaLaboral();
            }
            else{
                this.addHistoriaLaboral(situacionLaboral);
            }
        }
        else{
            this.plex.info('danger', 'Debe completar todos los datos obligatorios');
        }
    }

    parseHistoriaLaboral():SituacionLaboral{
        let situacionLaboral = new SituacionLaboral();
        situacionLaboral.normaLegal = new NormaLegal(this.datosNormaLegal.datosNormaLegalForm.value);
        situacionLaboral.situacion = new Situacion(this.datosSituacion.datosSituacionForm.value);
        situacionLaboral.cargo = new Cargo(this.datosCargo.datosCargoForm.value);
        situacionLaboral.regimen = new Regimen(this.datosRegimen.datosRegimenForm.value);
        return situacionLaboral;
    }

    addHistoriaLaboral(situacionLaboral:SituacionLaboral){
        this.agenteService.addHistoriaLaboral(this.agente, situacionLaboral)
            .subscribe( agente => {
                this.resetForms();
                this.success.emit(agente);
        })
    }

    updateHistoriaLaboral(){}

    public cancelar(){
        this.resetForms();
        this.cancel.emit();
    }

    private resetForms(){
        this.datosNormaLegal.resetForm();
        this.datosSituacion.resetForm();
        this.datosCargo.resetForm();
        this.datosRegimen.resetForm();
    }
}