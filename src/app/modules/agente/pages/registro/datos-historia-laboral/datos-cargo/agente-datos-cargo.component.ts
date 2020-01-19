import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { ServicioService } from 'src/app/services/servicio.service';
import { AgrupamientoService } from 'src/app/services/agrupamiento.service';
import { PuestoService } from 'src/app/services/puesto.service';
import { SubPuestoService } from 'src/app/services/subpuesto.service';
import { SectorService } from 'src/app/services/sector.service';

import { Servicio } from 'src/app/models/Servicio';
import { Cargo } from 'src/app/models/Cargo';
import { Agrupamiento } from 'src/app/models/Agrupamiento';
import { Puesto } from 'src/app/models/Puesto';
import { SubPuesto } from 'src/app/models/Subpuesto';
import { Sector } from 'src/app/models/Sector';


@Component({
    selector: 'agente-datos-cargo',
    templateUrl: './agente-datos-cargo.html',
    // styleUrls: ['./agente-datos-cargo.scss']
})
export class AgenteDatosCargoComponent implements OnInit {
    @Input() cargo: Cargo;
    @Input() editable: boolean = false;
    @Output() outputCargo: EventEmitter<Cargo> = new EventEmitter<Cargo>();
    
    @ViewChild(FormGroupDirective) _form;

    datosCargoForm: FormGroup;
    servicios: Servicio[] = [];
    agrupamientos: Agrupamiento[] = [];
    puestos: Puesto[] = [];
    subpuestos: SubPuesto[] = [];
    sectores: Sector[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private servicioService: ServicioService,
        private agrupamientoService: AgrupamientoService,
        private puestoService: PuestoService,
        private subpuestoService: SubPuestoService,
        private sectorService: SectorService){}
    
    ngOnInit() {
        // Init Servicios
        this.servicioService.get({})
        .subscribe(data => {
            this.servicios = data;
        });
        // Init Agrupamientos
        this.agrupamientoService.get({})
        .subscribe(data => {
            this.agrupamientos = data;
        });
        // Init Puestos/ Alias otro Agrupamiento
        this.puestoService.get({})
        .subscribe(data => {
            this.puestos = data;
        });
        // Init Subpuestos/ Alias Funciones
        this.subpuestoService.get({})
        .subscribe(data => {
            this.subpuestos = data;
        });
        // Init Sectores/ Alias Lugar de Trabajo
        this.sectorService.get({})
        .subscribe(data => {
            this.sectores = data;
        });

        this.datosCargoForm = this.createDatosCargoForm();
        this.datosCargoForm.valueChanges.subscribe(() => {
            this.outputCargo.emit(this.datosCargoForm.value);
        });

    }

    createDatosCargoForm()
    {
        return this.formBuilder.group({
            agrupamiento        : [this.cargo.agrupamiento],
            puesto              : [this.cargo.puesto],
            subpuesto           : [this.cargo.subpuesto],
            sector              : [this.cargo.sector],
            servicio            : [this.cargo.servicio],
            observaciones       : [this.cargo.observaciones]
        });
    }

    resetForm(){
        formUtils.resetForm(this.datosCargoForm, this._form);
    }

}
