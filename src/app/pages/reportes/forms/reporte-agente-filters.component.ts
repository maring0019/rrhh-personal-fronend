import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Sector } from 'src/app/models/Sector';
import { SectorService } from 'src/app/services/sector.service';
import { Agente } from 'src/app/models/Agente';
import { AgenteService } from 'src/app/services/agente.service';


@Component({
    selector: 'app-reporte-agente-filters',
    templateUrl: './reporte-agente-filters.html',
})
export class ReporteAgenteFiltersComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    private timeoutHandle: number;
    
    // Form select options
    public agentes: Agente[] = [];
    public sectores: Sector[] = []; // Alias Lugar de Trabajo

    public formRadioOptions = {
        'all'    : [{ id: true, label: 'Todos los Agentes' }],
        'one'    : [{ id: true, label: 'Sólo el agente'}],
        'trabajo':[{ id: true, label: 'Agentes con Lugar de Trabajo en:'}]
    }

    public opcionesAgenteTodos;
    public opcionesAgenteLugarTrabajo;
    public opcionesAgente;
    public opcionesTiposEstados;

    constructor(
        private formBuilder: FormBuilder,
        private sectorService: SectorService,
        private agenteService: AgenteService
        ){}
    
    ngOnInit() {
        this.initFormSelectOptions();
        this.form = this.initAgenteFilterForm();
    }

    ngOnDestroy(): void {
        clearInterval(this.timeoutHandle);
    }

    private initFormSelectOptions(){
        this.sectorService.get({})
            .subscribe(data => {
                this.sectores = data;
        });
        this.opcionesAgenteTodos = [{ id: true, label: 'Todos los Agentes' }];
        this.opcionesAgenteLugarTrabajo = [{ id: true, label: 'Agentes con Lugar de Trabajo en:'}];
        this.opcionesAgente = [{ id: true, label: 'Sólo el agente'}];
        this.opcionesTiposEstados =[
            {id:'activo', nombre:'Sólo agentes activos'},
            {id:'baja', nombre:'Sólo agentes inactivos'},
            {id:'todos', nombre:'Todos (activos e inactivos)'}
        ];
    }

    initAgenteFilterForm()
    {
        return this.formBuilder.group({
            // Radio buttons options
            optionAgenteTodos        : [true],
            optionAgenteLugarTrabajo : [],
            optionAgente             : [],
            // Filter options
            lugarTrabajo             : [],
            agente                   : [],
            activo                   : [{id:'activo', nombre:'Sólo agentes activos'}]
        });
    }

    prepareSearchParams(){
        let params:any = {};
        let form = this.form.value;
        // Filters
        if (form.optionAgenteLugarTrabajo){
            params['situacionLaboral.cargo.sector._id'] = form.lugarTrabajo.id;
        }
        if (form.optionAgente){
            params['_id'] = form.agente.id;
        }
        if (form.activo){
            if (form.activo.id == 'activo') params['activo'] = true;
            if (form.activo.id == 'baja') params['activo!'] = true;
        }
        return params;
    }


    public onChangeAgente(e){
        if (e && e.value) this.updateRadioOptionSelection('optionAgente');
    }

    public onChangeLugarTrabajo(e){
        if (e && e.value) this.updateRadioOptionSelection('optionAgenteLugarTrabajo');
    }

    public updateRadioOptionSelection(optionSelected:string){
        let opciones = ['optionAgenteTodos', 'optionAgenteLugarTrabajo', 'optionAgente'];
        for (const opt of opciones){
            if (opt == optionSelected){
                this.form.controls[opt].setValue(true);
            } 
            else{
                this.form.controls[opt].setValue(false);
            }
        }
    }

    public onSearchAgentes(event){
        if (event && event.query && event.query.length >= 4) {
            // Cancela la búsqueda anterior
            if (this.timeoutHandle) {
                window.clearTimeout(this.timeoutHandle);
            }
            
            let params:any = {};
            params['filter'] = JSON.stringify(
                {"$or":[
                    {"nombre"   :{"$regex": event.query, "$options":"i"}},
                    {"apellido" :{"$regex": event.query, "$options":"i"}},
                    {"numero"   :{"$regex": event.query, "$options":"i"}},
                ]});
            this.timeoutHandle = window.setTimeout(() => {
                this.timeoutHandle = null;
                this.agenteService.search(params).subscribe(
                    (agentes) => {
                        agentes.map(dato => { dato.nombre = `${dato.numero} - ${dato.apellido}, ${dato.nombre}`});
                        event.callback(agentes);
                    },
                    (err) => {
                        event.callback([]);
                    });
            }, 1000);
        
        }
        else {    
            event.callback([]);
        }
    }
}
