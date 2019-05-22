import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TipoSituacionService } from 'src/app/services/tm/situacion.service';
import { TipoNormaLegalService } from 'src/app/services/tipo-norma-legal.service';
import { SituacionLaboral } from 'src/app/models/SituacionLaboral';
import { TipoNormaLegal } from 'src/app/models/TipoNormaLegal';
import { TipoSituacion } from 'src/app/models/TipoSituacion';

@Component({
    selector: 'agente-datos-historia-laboral',
    templateUrl: './agente-datos-historia-laboral.html',
    styleUrls: ['../agente-registro.scss']
})
export class AgenteDatosHistoriaLaboralComponent implements OnInit {
    @Input() situacionLaboral: SituacionLaboral;
    @Output() outputSituacionLaboral: EventEmitter<SituacionLaboral> = new EventEmitter<SituacionLaboral>();

    datosHistoriaLaboralForm: FormGroup;
    tiposSituacion: TipoSituacion[] = [];
    tiposNormaLegal: TipoNormaLegal[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private tipoSituacionService: TipoSituacionService,
        private tipoNormaLegalService: TipoNormaLegalService){}

    ngOnInit() {
        // Init Tipos Situacion
        this.tipoSituacionService.get({})
            .subscribe(data => {
                this.tiposSituacion = data;
        });
        // Init Tipos Normas
        this.tipoNormaLegalService.get({})
            .subscribe(data => {
                this.tiposNormaLegal = data;
        });
        this.datosHistoriaLaboralForm = this.createDatosHistoriaLaboralForm();
        console.log(this.situacionLaboral);
    }

    createDatosHistoriaLaboralForm()
    {
        return this.formBuilder.group({
            fechaIngresoEstado    : [this.situacionLaboral.fechaIngresoEstado],
            fechaIngresoHospital  : [this.situacionLaboral.fechaIngresoHospital],
            antiguedadVacaciones  : [this.situacionLaboral.antiguedadVacaciones],
            antiguedadPago        : [this.situacionLaboral.antiguedadPago],
            tipoNormaLegal        : [this.situacionLaboral.tipoNormaLegal],
            numeroNormaLegal      : [this.situacionLaboral.numeroNormaLegal],
            fechaNormaLegal       : [this.situacionLaboral.fechaNormaLegal],
        });
    }
}
