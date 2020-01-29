import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { TipoSituacionService } from 'src/app/services/tm/situacion.service';
import { TipoSituacion } from 'src/app/models/TipoSituacion';
import { Situacion } from 'src/app/models/Situacion';

@Component({
    selector: 'agente-datos-situacion',
    templateUrl: './agente-datos-situacion.html',
})
export class AgenteDatosSituacionComponent implements OnInit {
    @Input() situacion: Situacion;
    @Input() editable: boolean = false;
    @Output() outputSituacion: EventEmitter<Situacion> = new EventEmitter<Situacion>();

    @ViewChild(FormGroupDirective) _form;

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
            tipoSituacion          : [this.situacion.tipoSituacion],
            lugarPago              : [this.situacion.lugarPago],
            exceptuadoFichado      : [this.situacion.exceptuadoFichado],
            trabajaEnHospital      : [this.situacion.trabajaEnHospital],
            trasladado             : [this.situacion.trasladoDesde? true : false],
            trasladoDesde          : [this.situacion.trasladoDesde]
        });
    }

    resetForm(){
        formUtils.resetForm(this.datosSituacionForm, this._form);
    }

}
