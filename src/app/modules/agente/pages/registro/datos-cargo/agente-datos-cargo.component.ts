import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Cargo } from 'src/app/models/Cargo';
import { TipoNormaLegalService } from 'src/app/services/tipo-norma-legal.service';
import { TipoNormaLegal } from 'src/app/models/TipoNormaLegal';

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

    constructor(
        private formBuilder: FormBuilder,
        private tipoNormaLegalService: TipoNormaLegalService){}
    
    ngOnInit() {
        // Init Tipos Normas
        this.tipoNormaLegalService.get({})
            .subscribe(data => {
                this.tiposNormaLegal = data;
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
        });
    }

}
