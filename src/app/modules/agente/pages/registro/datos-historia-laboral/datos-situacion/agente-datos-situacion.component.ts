import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TipoSituacionService } from 'src/app/services/tm/situacion.service';
import { TipoSituacion } from 'src/app/models/TipoSituacion';
import { SituacionLaboral } from 'src/app/models/SituacionLaboral';

@Component({
    selector: 'agente-datos-situacion',
    templateUrl: './agente-datos-situacion.html',
})
export class AgenteDatosSituacionComponent implements OnInit {
    @Input() situacion: SituacionLaboral;
    @Input() editable: boolean = false;
    @Output() outputSituacion: EventEmitter<SituacionLaboral> = new EventEmitter<SituacionLaboral>();

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
        this.datosSituacionForm.valueChanges.subscribe(() => {
            this.outputSituacion.emit(this.datosSituacionForm.value);
        });
    }

    createDatosSituacionForm()
    {
        return this.formBuilder.group({
            // Datos Generales
            fechaIngresoEstado     : [this.situacion.fechaIngresoEstado],
            fechaIngresoHospital   : [this.situacion.fechaIngresoHospital],
            antiguedadVacaciones   : [this.situacion.antiguedadVacaciones],
            antiguedadPago         : [this.situacion.antiguedadPago],
            // Situacion
            situacion              : [this.situacion.situacion],
            lugarPago              : [this.situacion.lugarPago],
            exceptuadoFichado      : [this.situacion.exceptuadoFichado],
            trabajaEnHospital      : [this.situacion.trabajaEnHospital],
            trasladado             : [this.situacion.trasladoDesde? true : false],
            trasladoDesde          : [this.situacion.trasladoDesde]
        });
    }

}
