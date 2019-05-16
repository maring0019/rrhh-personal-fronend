import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Cargo } from 'src/app/models/Cargo';
import { TipoNormaLegalService } from 'src/app/services/tipo-norma-legal.service';
import { TipoNormaLegal } from 'src/app/models/TipoNormaLegal';
import { ServicioService } from 'src/app/services/servicio.service';
import { Servicio } from 'src/app/models/Servicio';

@Component({
    selector: 'agente-datos-cargo',
    templateUrl: './agente-datos-cargo.html',
    // styleUrls: ['./agente-datos-cargo.scss']
})
export class AgenteDatosCargoComponent implements OnInit {
    @Input() cargo: Cargo;
    @Output() outputCargo: EventEmitter<Cargo> = new EventEmitter<Cargo>();

    datosCargoForm: FormGroup;
    tiposNormaLegal: TipoNormaLegal[] = [];
    servicios: Servicio[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private tipoNormaLegalService: TipoNormaLegalService,
        private servicioService: ServicioService){}
    
    ngOnInit() {
        // Init Tipos Normas
        this.tipoNormaLegalService.get({})
            .subscribe(data => {
                this.tiposNormaLegal = data;
        });
        // Init Servicios
        this.servicioService.get({})
        .subscribe(data => {
            this.servicios = data;
        });

        this.datosCargoForm = this.createDatosCargoForm();
    }

    createDatosCargoForm()
    {
        return this.formBuilder.group({
            tipoNormaLegal      : [this.cargo.tipoNormaLegal],
            numeroNormaLegal    : [this.cargo.numeroNormaLegal],
            fechaNormaLegal     : [this.cargo.fechaNormaLegal],
            observaciones       : [this.cargo.observaciones],
            servicio            : [this.cargo.servicio]
        });
    }

}
