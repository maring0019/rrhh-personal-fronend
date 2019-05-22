import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TipoSituacionService } from 'src/app/services/tm/situacion.service';
import { TipoSituacion } from 'src/app/models/TipoSituacion';
import { Situacion } from 'src/app/models/Situacion';

@Component({
    selector: 'agente-datos-situacion',
    templateUrl: './agente-datos-situacion.html',
    // styleUrls: ['./agente-datos-situacion.scss']
})
export class AgenteDatosSituacionComponent implements OnInit {
    @Input() situacion: Situacion;
    @Output() outputSituacion: EventEmitter<Situacion> = new EventEmitter<Situacion>();

    datosSituacionForm: FormGroup;
    tiposSituacion: TipoSituacion[] = [];


    constructor(
        private formBuilder: FormBuilder,
        private tipoSituacionService: TipoSituacionService){}
    
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
            tipoSituacion          : [this.situacion.tipoSituacion],
            situacionLugarPago     : [this.situacion.situacionLugarPago],
            exceptuadoFichado      : [this.situacion.exceptuadoFichado],
            trabajaEnHospital      : [this.situacion.trabajaEnHospital],
            trasladado             : [this.situacion.trasladoDesde? true : false],
            trasladoDesde          : [this.situacion.trasladoDesde]
        });
    }

}
