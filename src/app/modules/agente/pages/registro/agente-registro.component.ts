import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Plex } from '@andes/plex';

import { AgenteService } from 'src/app/services/agente.service';
import  *  as formUtils from 'src/app/utils/formUtils';

import { AgenteDatosBasicosComponent } from './datos-basicos/agente-datos-basicos.component';
import { AgenteDatosDireccionComponent } from './datos-contacto/agente-datos-direccion.component';
import { AgenteDatosContactoComponent } from './datos-contacto/agente-datos-contacto.component';
import { AgenteDatosEducacionComponent } from './datos-educacion/agente-datos-educacion.component';
import { AgenteDatosSituacionComponent } from './datos-historia-laboral/datos-situacion/agente-datos-situacion.component';
import { AgenteDatosCargoComponent } from './datos-historia-laboral/datos-cargo/agente-datos-cargo.component';
import { AgenteDatosRegimenComponent } from './datos-historia-laboral/datos-regimen/agente-datos-regimen.component';
import { FileManagerComponent } from 'src/app/components/file-manager/file.manager.component';

import { Contacto } from 'src/app/models/Contacto';
import { Agente } from 'src/app/models/Agente';
import { Direccion } from 'src/app/models/Direccion';
import { Ubicacion } from 'src/app/models/Ubicacion';
import { Educacion } from 'src/app/models/Educacion';
import { Cargo } from 'src/app/models/Cargo';
import { SituacionLaboral } from 'src/app/models/SituacionLaboral';
import { Regimen } from 'src/app/models/Regimen';
import { PlexTabsComponent } from '@andes/plex/src/lib/tabs/tabs.component';

@Component({
    selector: 'app-agente-registro',
    templateUrl: './agente-registro.html',
    styleUrls: ['./agente-registro.scss']
  })

export class AgenteRegistroComponent implements OnInit {
    @ViewChild(AgenteDatosBasicosComponent) datosBasicos: AgenteDatosBasicosComponent;
    @ViewChild(AgenteDatosDireccionComponent) datosDireccion: AgenteDatosDireccionComponent;
    @ViewChild(AgenteDatosContactoComponent) datosContacto: AgenteDatosContactoComponent;
    @ViewChild(AgenteDatosEducacionComponent) datosEducacion: AgenteDatosEducacionComponent;
    @ViewChild(AgenteDatosSituacionComponent) datosSituacion: AgenteDatosSituacionComponent;
    @ViewChild(AgenteDatosCargoComponent) datosCargo: AgenteDatosCargoComponent;
    @ViewChild(AgenteDatosRegimenComponent) datosRegimen: AgenteDatosRegimenComponent;
    @ViewChild(FileManagerComponent) fileManager: FileManagerComponent;
    @ViewChild("tabs") agenteTabs: PlexTabsComponent;
    
    
    @HostBinding('class.plex-layout') layout = true;
    // Datos para los formularios
    public agente: Agente;
    public direccion: Direccion;
    public contactos: Contacto[];
    public educacion: Educacion[];
    public situacion: SituacionLaboral;
    public cargo: Cargo;
    public regimen: Regimen;

    // Variable de control para determinar si se puede puede editar
    // los datos de un agente. En el caso de un alta siempre es true
    public isEditable: boolean= true;

    // Datos a mostrar del agente en el panel lateral. Los cambios en
    // los formularios son aplicados inmediatamente a este objeto
    public agenteDetalle: Agente;

    private _agenteID:any; // To keep track of agente on edit

    constructor(
        private agenteService:AgenteService,
        private route: ActivatedRoute,
        private router: Router,
        public plex: Plex
        ){}

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this._agenteID = params.get('id');
            if (this._agenteID){
                this.prepareDataForUpdate();
            }
            else{
                this.prepareDataForCreate();
            }
        });
    }

    private prepareDataForUpdate(){
        this.isEditable = false;
        this.agenteService.getByID(this._agenteID).subscribe((data) => {
            if (data){
                this.agente = new Agente(data);
                this.agenteDetalle = new Agente(data);
                this.initValueForms();
            }else{
                this.plex.info('info', 'El agente que desea editar no existe!')
                    .then( e => {
                        this.volverInicio();
                });
            }
        });
    }

    private prepareDataForCreate(){
        this.agente = new Agente();
        this.agenteDetalle = new Agente();
        this.initValueForms();
    }

    initValueForms(){
        this.direccion = this.agente.direccion;
        this.contactos = this.agente.contactos;
        this.educacion = this.agente.educacion;
        this.situacion = this.agente.situacionLaboral;
        this.cargo = this.agente.situacionLaboral.cargo;
        this.regimen = this.agente.situacionLaboral.regimen;
    }

    initAusentismoFiles(){
        // if (this._agenteID){
        //     this.filesService.getObjectFiles(this.ausentismoID)
        //         .subscribe(data => {
        //             this.ausentismoFiles = data;
        //     });
        // }
    }

    onValueChangeAgente(obj: Agente){
        Object.assign(this.agenteDetalle, obj);
    }

    onValueChangeDireccion(obj: Direccion){
        this.agenteDetalle.direccion = obj;
        this.agenteDetalle.direccion.ubicacion = (new Ubicacion(obj));
    }

    onValueChangeContactos(contactos: Contacto[]){
        this.agenteDetalle.contactos = contactos;
    }
    
    onValueChangeEducacion(educacion: Educacion[]){
        this.agenteDetalle.educacion = educacion;
    }

    onValueChangeSituacion(obj: SituacionLaboral){
        this.agenteDetalle.situacionLaboral = obj;
    }

    onValueChangeCargo(obj: Cargo){
        this.agenteDetalle.situacionLaboral.cargo = obj;
    }

    onValueChangeRegimen(obj: Regimen){
        this.agenteDetalle.situacionLaboral.regimen = obj;
    }

    allFormsValid(){
        const forms:any = [
            this.datosBasicos.datosBasicosForm,
            this.datosDireccion.direccionForm,
            this.datosSituacion.datosSituacionForm,
            this.datosCargo.datosCargoForm,
            this.datosRegimen.datosRegimenForm
            ]
        this.datosContacto.contactoForms.controls.forEach(cf => {
            forms.push(cf)
        })
        this.datosEducacion.educacionForms.controls.forEach(ef => {
            forms.push(ef)
        })
        
        let existInvalidForms = false;
        forms.forEach(f => {
            if (f.invalid){
                existInvalidForms = true;
                formUtils.markFormAsInvalid(f);
            }
        });
        return !existInvalidForms;
    }

    saveAgente(){
        if (this.allFormsValid()){
            const agente = this.parseAgente();
            if (this._agenteID){
                this.updateAgente(agente);
            }
            else{
                this.addAgente(agente);
            }
        }
        else{
            this.plex.info('danger', 'Debe completar todos los datos obligatorios');
        }
    }

    parseAgente():Agente{
        const agente = new Agente(this.datosBasicos.datosBasicosForm.value);
        const direccion = new Direccion(this.datosDireccion.direccionForm.value);

        // Contactos
        const contactos:Contacto[] = []
        this.datosContacto.contactoForms.controls.forEach(form => {
            const contacto = new Contacto(form.value);
            contactos.push(contacto);
        });

        // Educacion
        const estudios:Educacion[] = []
        this.datosEducacion.educacionForms.controls.forEach(form => {
            if(form.value.educacion && form.value.educacion.tipoEducacion != null){
                const educacion = new Educacion(form.value.educacion);
                estudios.push(educacion);
            }
        });
        
        // Situacion Laboral (Situacion, Cargo, Regimen)
        const cargo = new Cargo(this.datosCargo.datosCargoForm.value);
        const regimen = new Regimen(this.datosRegimen.datosRegimenForm.value);
        const situacion = new SituacionLaboral(this.datosSituacion.datosSituacionForm.value);
        situacion.cargo = cargo;
        situacion.regimen = regimen;
        agente.situacionLaboral = situacion;
        agente.direccion = direccion;
        agente.contactos = contactos;
        agente.educacion = estudios;
        return agente;
    }

    addAgente(agente){
        this.agenteService.post(agente)
            .subscribe(data=> {
                this.saveFiles(data);
                this.plex.info('success', 'El agente se ingresó correctamente')
                    .then( e => {
                        this.volverInicio();
                });
        })
    }

    updateAgente(agente){
        this.agenteService.put(agente)
            .subscribe(agenteData=> {
                if (this.datosBasicos.nuevaFotoAgente){
                    this.agenteService.postFoto(this._agenteID, this.datosBasicos.nuevaFotoAgente)
                        .subscribe(data=> {
                            this.plex.info('success', 'El agente se modificó correctamente')
                                .then( e => {
                                this.volverInicio();
                            });
                    })
                }
                else{
                    this.saveFiles(agenteData);
                    this.plex.info('success', 'El agente se modificó correctamente')
                        .then( e => {
                        this.volverInicio();
                    });
                }
        })
    }

    private saveFiles(agente){
        this.fileManager.saveFileChanges(agente);
    }

    // Button Actions

    public onEditar(){
        this.isEditable = true;
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


    volverInicio() {
        this.router.navigate(['/agentes/busqueda'])
    }
    
}