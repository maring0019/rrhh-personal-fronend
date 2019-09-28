import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Sector } from 'src/app/models/Sector';
import { Agente } from 'src/app/models/Agente';


@Component({
    selector: 'app-reporte-seleccion-tipo',
    templateUrl: './reporte-seleccion-tipo.html',
})
export class ReporteSeleccionTipoComponent implements OnInit {

    public form: FormGroup;
    
    // Form select options
    public agentes: Agente[] = [];
    public sectores: Sector[] = []; // Alias Lugar de Trabajo
    public opcionesAgenteTodos;
    public opcionesAgenteLugarTrabajo;
    public opcionesAgente;

    constructor(
        private formBuilder: FormBuilder){}
    
    ngOnInit() {
        this.initFormSelectOptions();
        this.form = this.initForm();
    }

    private initFormSelectOptions(){
        // this.sectorService.get({})
        //     .subscribe(data => {
        //         this.sectores = data;
        // });
        // // this.agenteService.get({})
        // //     .subscribe(data => {
        // //         this.agentes = data;
        // // });
        // this.opcionesAgenteTodos = [
        //     { id: 'true', label: 'Todos los Agentes' }];
        // this.opcionesAgenteLugarTrabajo = [
        //     { id: 'true', label: 'Agentes con Lugar de Trabajo en:'}];
        // this.opcionesAgente = [
        //     { id: 'true', label: 'Sólo el agente'}];
    }

    initForm()
    {
        return this.formBuilder.group({
            // // Radio buttons options
            // optionAgenteTodos        : ['true'],
            // optionAgenteLugarTrabajo : [],
            // optionAgente             : [],
            // // Filter options
            // lugarTrabajo             : [],
            // agente                   : [],
            // activo                   : []
        });
    }

    

    public onChangeOptionAgente(e){
        
    }
}
