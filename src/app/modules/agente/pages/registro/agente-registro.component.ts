import { Component, OnInit, HostBinding, ViewChild, AfterViewInit } from '@angular/core';

import { AgenteDatosBasicosComponent } from './datos-basicos/agente-datos-basicos.component';
import { AgenteDatosDireccionComponent } from './datos-contacto/agente-datos-direccion.component';

import { IContacto } from 'src/app/models/IContacto';
import { Agente } from 'src/app/models/Agente';

import { AgenteService } from 'src/app/services/agente.service';
import { Direccion } from 'src/app/models/Direccion';
import { Ubicacion } from 'src/app/models/Ubicacion';


@Component({
    selector: 'app-agente-registro',
    templateUrl: './agente-registro.html',
    // styleUrls: ['./age.scss']
  })

export class AgenteRegistroComponent implements AfterViewInit {
    @ViewChild(AgenteDatosBasicosComponent) datosBasicos: AgenteDatosBasicosComponent;
    @ViewChild(AgenteDatosDireccionComponent) datosDireccion: AgenteDatosDireccionComponent;
    
    @HostBinding('class.plex-layout') layout = true;
    agente: Agente;
    direccion: Direccion;
    contactos: IContacto[] = [];

    constructor(private agenteService:AgenteService){}

    ngOnInit() {
        // this.agente = new Agente({documento:28588178, nombre:'David', sexo:'masculino'});
        this.agente = new Agente();
        this.direccion = new Direccion();
    }

    ngAfterViewInit() {}

    markFormAsInvalid(form){
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            control.markAsTouched({ onlySelf: true });
            });
    }

    saveAgente(){
        const forms = [
            this.datosBasicos.datosBasicosForm,
            this.datosDireccion.direccionForm
            ]
        let existInvalidForms = false;
        forms.forEach(f => {
            if (f.invalid){
                console.log(f);
                existInvalidForms = true;
                this.markFormAsInvalid(f);
            }
        });
        if (existInvalidForms) return;
        
        const agente = new Agente(this.datosBasicos.datosBasicosForm.value);
        const ubicacion = new Ubicacion(this.datosDireccion.direccionForm.value);
        const direccion = new Direccion(this.datosDireccion.direccionForm.value);
        direccion.ubicacion = ubicacion;
        agente.direccion = [direccion];

        // console.log('RAW DATA####');
        // console.log(rawData);
        // console.log('VALUE DATA####');
        // console.log(data);
        this.agenteService.post(agente)
            .subscribe(data=> {
                return
            })
    }

}