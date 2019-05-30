import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Plex } from '@andes/plex';

import { AgenteService } from 'src/app/services/agente.service';

import { AgenteDatosBasicosComponent } from './datos-basicos/agente-datos-basicos.component';
import { AgenteDatosDireccionComponent } from './datos-contacto/agente-datos-direccion.component';
import { AgenteDatosContactoComponent } from './datos-contacto/agente-datos-contacto.component';
import { AgenteDatosEducacionComponent } from './datos-educacion/agente-datos-educacion.component';
import { AgenteDatosCargoComponent } from './datos-historia-laboral/datos-cargo/agente-datos-cargo.component';
import { AgenteDatosSituacionComponent } from './datos-historia-laboral/datos-situacion/agente-datos-situacion.component';
import { AgenteDatosRegimenComponent } from './datos-historia-laboral/datos-regimen/agente-datos-regimen.component';

import { Contacto } from 'src/app/models/Contacto';
import { Agente } from 'src/app/models/Agente';
import { Direccion } from 'src/app/models/Direccion';
import { Ubicacion } from 'src/app/models/Ubicacion';
import { Educacion } from 'src/app/models/Educacion';
import { Cargo } from 'src/app/models/Cargo';
import { SituacionLaboral } from 'src/app/models/SituacionLaboral';
import { Situacion } from 'src/app/models/Situacion';
import { Regimen } from 'src/app/models/Regimen';


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
    
    @HostBinding('class.plex-layout') layout = true;
    agente: Agente;
    direccion: Direccion;
    contactos: Contacto[];
    educacion: Educacion[];
    situacion: Situacion;
    cargo: Cargo;
    regimen: Regimen;
    situacionLaboral: SituacionLaboral;

    _agenteID:any; // To keep track of agente on edit

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
                this.agenteService.getByID(this._agenteID).subscribe((data) => {
                    //TODO Sino se encuentra el agente analizar que hacer
                    this.agente = new Agente(data);
                    console.log(this.agente)
                    this.initValueForms(this.agente);
                });
            }
            else{
                this.agente = new Agente();
                this.initValueForms(this.agente);
            }
        });
    }

    initValueForms(agente){
        this.direccion = agente.direccion;
        this.contactos = agente.contactos;
        this.educacion = agente.educacion;
        this.situacion = agente.situacionLaboralActiva.situacion;
        this.cargo = agente.situacionLaboralActiva.cargo;
        this.regimen = agente.situacionLaboralActiva.regimen;
        this.situacionLaboral = agente.situacionLaboralActiva;
    }

    onValueChangeAgente(obj: Agente){
        obj.id = this._agenteID;
        console.log(obj)
        this.agente = obj;
    }

    onValueChangeDireccion(obj: Direccion){
        this.direccion = obj;
        this.direccion.ubicacion = (new Ubicacion(obj));
    }

    onValueChangeContactos(contactos: Contacto[]){
        this.contactos = contactos;
    }
    
    onValueChangeEducacion(educacion: Educacion[]){
        this.educacion = educacion;
    }

    onValueChangeSituacion(obj: Situacion){
        this.situacion = obj;
    }

    onValueChangeCargo(obj: Cargo){
        this.cargo = obj;
    }

    onValueChangeRegimen(obj: Regimen){
        this.regimen = obj;
    }

    /**
     * 
     * @param form 
     */
    markFormAsInvalid(form){
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            control.markAsTouched({ onlySelf: true });
            });
    }

    allFormsValid(){
        const forms:any = [
            // this.datosBasicos.datosBasicosForm,
            // this.datosDireccion.direccionForm,
            this.datosSituacion.datosSituacionForm,
            this.datosCargo.datosCargoForm,
            this.datosRegimen.datosRegimenForm
            ]
        // this.datosContacto.contactoForms.controls.forEach(cf => {
        //     forms.push(cf)
        // })
        // this.datosEducacion.educacionForms.controls.forEach(ef => {
        //     forms.push(ef)
        // })
        
        let existInvalidForms = false;
        forms.forEach(f => {
            if (f.invalid){
                existInvalidForms = true;
                this.markFormAsInvalid(f);
            }
        });
        return !existInvalidForms;
    }

    saveAgente(){
        
        if (this.allFormsValid()){
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
            const situacion = new Situacion(this.datosSituacion.datosSituacionForm.value);
            // const situacionLaboral = new SituacionLaboral(this.datosSituacion.datosSituacionForm.value)
            const situacionLaboral = new SituacionLaboral();
            situacionLaboral.cargo = cargo;
            situacionLaboral.regimen = regimen;
            situacionLaboral.situacion = situacion;

            agente.direccion = direccion;
            agente.contactos = contactos;
            agente.educacion = estudios;
            agente.historiaLaboral.push(situacionLaboral);
            console.log('HISTORIA LABORAL');
            console.log(agente.historiaLaboral[0]);

            if (this._agenteID){
                agente.id = this._agenteID;
                this.agenteService.put(agente)
                    .subscribe(data=> {
                        this.plex.info('success', 'El agente se modificó correctamente')
                        .then( e => {
                            this.volverInicio();
                    });
                })
            }
            else{
                this.agenteService.post(agente)
                    .subscribe(data=> {
                        this.plex.info('success', 'El agente se ingresó correctamente')
                            .then( e => {
                                this.volverInicio();
                        });
                })
            }
        }
        else{
            this.plex.info('info', 'Debe completar todos los datos obligatorios');
        }
    }

    volverInicio() {
        this.router.navigate(['/agentes/busqueda'])
    }

    
}