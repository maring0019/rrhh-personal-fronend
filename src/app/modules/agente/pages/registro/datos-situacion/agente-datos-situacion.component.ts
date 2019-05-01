import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Situacion } from 'src/app/models/Situacion';
import { SituacionLaboral } from 'src/app/models/SituacionLaboral';
import { SituacionService } from 'src/app/services/tm/situacion.service';

@Component({
    selector: 'agente-datos-situacion',
    templateUrl: './agente-datos-situacion.html',
    // styleUrls: ['./agente-datos-situacion.scss']
})
export class AgenteDatosSituacionComponent implements OnInit {
    @Input() situacionLaboral: SituacionLaboral;
    @Output() outputSituacionLaboral: EventEmitter<SituacionLaboral> = new EventEmitter<SituacionLaboral>();

    datosSituacionForm: FormGroup;
    tiposSituacion: Situacion[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private tipoSituacionService: SituacionService){}
    
    ngOnInit() {
        // Init Tipos Situacion
        this.tipoSituacionService.get({})
            .subscribe(data => {
                this.tiposSituacion = data;
        });

        this.datosSituacionForm = this.createDatosSituacionForm();
    }

    createDatosSituacionForm()
    {
        return this.formBuilder.group({
            situacion            : [this.situacionLaboral.situacion],
            situacionLugarPago   : [this.situacionLaboral.situacionLugarPago]
        });
    }

}
