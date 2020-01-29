import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SituacionLaboral } from 'src/app/models/SituacionLaboral';

@Component({
    selector: 'agente-datos-generales',
    templateUrl: './agente-datos-generales.html',
})
export class AgenteDatosGeneralesComponent implements OnInit {
    @Input() situacionLaboral: SituacionLaboral;
    @Input() editable: boolean = false;
    @Output() change: EventEmitter<SituacionLaboral> = new EventEmitter<SituacionLaboral>();

    datosGeneralesForm: FormGroup;

    constructor(private formBuilder: FormBuilder){}
    
    ngOnInit() {
        this.datosGeneralesForm = this.createDatosGeneralesForm();
        this.datosGeneralesForm.valueChanges.subscribe(() => {
            this.change.emit(this.datosGeneralesForm.value);
        });
    }

    createDatosGeneralesForm()
    {
        return this.formBuilder.group({
            // Datos Generales
            fechaIngresoEstado     : [this.situacionLaboral.fechaIngresoEstado],
            fechaIngresoHospital   : [this.situacionLaboral.fechaIngresoHospital],
            antiguedadVacaciones   : [this.situacionLaboral.antiguedadVacaciones],
            antiguedadPago         : [this.situacionLaboral.antiguedadPago],
        });
    }

}
