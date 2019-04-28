import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { AgenteService } from 'src/app/services/agente.service';

import { AgenteDatosBasicosComponent } from './datos-basicos/agente-datos-basicos.component';
import { AgenteDatosDireccionComponent } from './datos-contacto/agente-datos-direccion.component';
import { AgenteDatosContactoComponent } from './datos-contacto/agente-datos-contacto.component';
import { AgenteDatosEducacionComponent } from './datos-educacion/agente-datos-educacion.component';

import { Contacto } from 'src/app/models/Contacto';
import { Agente } from 'src/app/models/Agente';
import { Direccion } from 'src/app/models/Direccion';
import { Ubicacion } from 'src/app/models/Ubicacion';
import { Educacion } from 'src/app/models/Educacion';


@Component({
    selector: 'app-agente-registro',
    templateUrl: './agente-registro.html',
    // styleUrls: ['./age.scss']
  })

export class AgenteRegistroComponent implements OnInit {
    @ViewChild(AgenteDatosBasicosComponent) datosBasicos: AgenteDatosBasicosComponent;
    @ViewChild(AgenteDatosDireccionComponent) datosDireccion: AgenteDatosDireccionComponent;
    @ViewChild(AgenteDatosContactoComponent) datosContacto: AgenteDatosContactoComponent;
    @ViewChild(AgenteDatosEducacionComponent) datosEducacion: AgenteDatosEducacionComponent;
    
    @HostBinding('class.plex-layout') layout = true;
    agente: Agente;
    direccion: Direccion;
    contactos: Contacto[];
    educacion: Educacion[];

    _agenteID:any; // To keep track of agente on edit

    constructor(
        private agenteService:AgenteService,
        private route: ActivatedRoute,
        private router: Router,
        ){}

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this._agenteID = params.get('id');
            this.agenteService.getByID(this._agenteID).subscribe((data) => {
                this.agente = new Agente(data);
                this.direccion = this.agente.direccion;
                this.contactos = this.agente.contactos;
                this.educacion = this.agente.educacion;
            });
        });
    }

    onValueChangeAgente(obj: Agente){
        obj.id = this._agenteID;
        this.agente = obj;
        console.log(this.agente);
    }

    onValueChangeDireccion(obj: Direccion){
        this.direccion = obj;
        this.direccion.ubicacion = (new Ubicacion(obj));

    }

    onValueChangeContactos(obj: Contacto[]){
        this.contactos = obj;
    }
    
    onValueChangeEducacion(obj: Educacion[]){
        this.educacion = obj;
    }

    markFormAsInvalid(form){
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            control.markAsTouched({ onlySelf: true });
            });
    }

    allFormsValid(){
        const forms:any = [
            this.datosBasicos.datosBasicosForm,
            this.datosDireccion.direccionForm
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
                this.markFormAsInvalid(f);
            }
        });
        return !existInvalidForms;
    }

    saveAgente(){
        
        if (this.allFormsValid()){
            const agente = new Agente(this.datosBasicos.datosBasicosForm.value);
            const ubicacion = new Ubicacion(this.datosDireccion.direccionForm.value);
            const direccion = new Direccion(this.datosDireccion.direccionForm.value);
            direccion.ubicacion = ubicacion;
            agente.direccion = direccion;

            // Contactos
            const contactos:Contacto[] = []
            this.datosContacto.contactoForms.controls.forEach(form => {
                const contacto = new Contacto(form.value);
                contactos.push(contacto);
            });
            agente.contactos = contactos;

            //Educacion
            const estudios:Educacion[] = []
            this.datosEducacion.educacionForms.controls.forEach(form => {
                const educacion = new Educacion(form.value);
                estudios.push(educacion);
            });
            agente.educacion = estudios;

            this.agenteService.post(agente)
                .subscribe(data=> {
                    return
                })
        }
    }

    volverInicio() {
        this.router.navigate(['/inicio'])
    }

    
}