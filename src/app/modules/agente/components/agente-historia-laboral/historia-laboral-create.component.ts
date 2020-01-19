import { Component, OnInit, HostBinding, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Plex } from '@andes/plex';

import { AgenteService } from 'src/app/services/agente.service';
import  *  as formUtils from 'src/app/utils/formUtils';


import { AgenteDatosSituacionComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-situacion/agente-datos-situacion.component';
import { AgenteDatosCargoComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-cargo/agente-datos-cargo.component';
import { AgenteDatosRegimenComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-regimen/agente-datos-regimen.component';
import { AgenteDatosNormaLegalComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-norma-legal/agente-datos-norma-legal.component';
import { FileManagerComponent } from 'src/app/components/file-manager/file.manager.component';

import { Agente } from 'src/app/models/Agente';
import { NormaLegal } from 'src/app/models/NormaLegal';
import { Cargo } from 'src/app/models/Cargo';
import { SituacionLaboral } from 'src/app/models/SituacionLaboral';
import { Regimen } from 'src/app/models/Regimen';

import { PlexTabsComponent } from '@andes/plex/src/lib/tabs/tabs.component';

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
    
    @ViewChild(FileManagerComponent) fileManager: FileManagerComponent;
    @ViewChild("tabs") agenteTabs: PlexTabsComponent;
    
    
    @HostBinding('class.plex-layout') layout = true;
    // Datos para los formularios
    
    public normaLegal: NormaLegal;
    public situacion: SituacionLaboral;
    public cargo: Cargo;
    public regimen: Regimen;

    public isEditable = true;

    private _updating:any; // To keep track actual action. If false is create
    
    constructor(
        private agenteService:AgenteService,
        private route: ActivatedRoute,
        private router: Router,
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

            this.situacion = this.agente.situacionLaboral;
            this.normaLegal = this.agente.situacionLaboral.normaLegal;
            this.cargo = this.agente.situacionLaboral.cargo;
            this.regimen = this.agente.situacionLaboral.regimen;
        }
        else{
            this.normaLegal = new NormaLegal();
            this.situacion = new SituacionLaboral();
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
        forms.forEach(f => {
            if (f.invalid){
                existInvalidForms = true;
                formUtils.markFormAsInvalid(f);
            }
        });
        return !existInvalidForms;
    }

    save(){
        if (this.allFormsValid()){
            const situacion = this.parseHistoriaLaboral();
            if (this._updating){
                this.updateHistoriaLaboral();
            }
            else{
                this.addHistoriaLaboral(situacion);
            }
        }
        else{
            this.plex.info('danger', 'Debe completar todos los datos obligatorios');
        }
    }

    parseHistoriaLaboral():SituacionLaboral{
        let situacion = new SituacionLaboral(this.datosSituacion.datosSituacionForm.value);
        situacion.normaLegal = new NormaLegal(this.datosNormaLegal.datosNormaLegalForm.value);
        situacion.cargo = new Cargo(this.datosCargo.datosCargoForm.value);
        situacion.regimen = new Regimen(this.datosRegimen.datosRegimenForm.value);
        return situacion;
    }

    addHistoriaLaboral(situacion:SituacionLaboral){
        this.agenteService.addHistoriaLaboral(this.agente, situacion)
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

    public onNextTab(){
        const maxTabs = this.agenteTabs.tabs.length;
        const idxTab = this.agenteTabs.activeIndex
        if ( (maxTabs-1) == idxTab ){
            this.agenteTabs.activeIndex = 0;
        }
        else{
            this.agenteTabs.activeIndex = this.agenteTabs.activeIndex + 1;
        }        
    }

    public onPrevTab(){
        const maxTabs = this.agenteTabs.tabs.length;
        const idxTab = this.agenteTabs.activeIndex
        if ( idxTab == 0 ){
            this.agenteTabs.activeIndex = maxTabs - 1;
        }
        else{
            this.agenteTabs.activeIndex = this.agenteTabs.activeIndex - 1;
        }
        
    }
}