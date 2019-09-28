import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Sector } from 'src/app/models/Sector';
import { SectorService } from 'src/app/services/sector.service';
import { Agente } from 'src/app/models/Agente';
import { AgenteService } from 'src/app/services/agente.service';


@Component({
    selector: 'app-reporte-agente-filters',
    templateUrl: './reporte-agente-filters.html',
})
export class ReporteAgenteFiltersComponent implements OnInit {

    public agenteFilterForm: FormGroup;
    
    // Form select options
    public agentes: Agente[] = [];
    public sectores: Sector[] = []; // Alias Lugar de Trabajo
    public opcionesAgenteTodos;
    public opcionesAgenteLugarTrabajo;
    public opcionesAgente;

    constructor(
        private formBuilder: FormBuilder,
        private sectorService: SectorService,
        private agenteService: AgenteService
        ){}
    
    ngOnInit() {
        this.initFormSelectOptions();
        this.agenteFilterForm = this.initAgenteFilterForm();
    }

    private initFormSelectOptions(){
        this.sectorService.get({})
            .subscribe(data => {
                this.sectores = data;
        });
        // this.agenteService.get({})
        //     .subscribe(data => {
        //         this.agentes = data;
        // });
        this.opcionesAgenteTodos = [
            { id: 'true', label: 'Todos los Agentes' }];
        this.opcionesAgenteLugarTrabajo = [
            { id: 'true', label: 'Agentes con Lugar de Trabajo en:'}];
        this.opcionesAgente = [
            { id: 'true', label: 'Sólo el agente'}];
    }

    initAgenteFilterForm()
    {
        return this.formBuilder.group({
            // Radio buttons options
            optionAgenteTodos        : ['true'],
            optionAgenteLugarTrabajo : [],
            optionAgente             : [],
            // Filter options
            lugarTrabajo             : [],
            agente                   : [],
            activo                   : []
        });
    }

    public onChangeOptionAgenteTodos(e){
        this.agenteFilterForm.patchValue(
            { optionAgenteLugarTrabajo: false,
              optionAgente: false});
    }
    
    public onChangeOptionAgenteLugarTrabajo(e){
        this.agenteFilterForm.patchValue(
            { optionAgenteTodos: false, 
              optionAgente: false});
    }

    public onChangeOptionAgente(e){
        this.agenteFilterForm.patchValue(
            { optionAgenteLugarTrabajo: false,
              optionAgenteTodos: false});
    }
}
