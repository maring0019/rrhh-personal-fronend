import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { TipoNormaLegalService } from 'src/app/services/tipo-norma-legal.service';

import { Cargo } from 'src/app/models/Cargo';

@Component({
    selector: 'agente-datos-norma-legal',
    templateUrl: './agente-datos-norma-legal.html'
})
export class AgenteDatosNormaLegalComponent implements OnInit {
    @Input() cargo: Cargo;
    @Input() editable: boolean = false;
    @Output() change: EventEmitter<Cargo> = new EventEmitter<Cargo>();

    @ViewChild(FormGroupDirective) _form;

    datosNormaLegalForm: FormGroup;
    public tiposNormaLegal$ = this.tipoNormaLegalService.get({});

    constructor(
        private formBuilder: FormBuilder,
        private tipoNormaLegalService: TipoNormaLegalService)
    {}
    
    ngOnInit() {    
        this.datosNormaLegalForm = this.createDatosNormaLegalForm();
        this.datosNormaLegalForm.valueChanges.subscribe(() => {
            this.change.emit(this.datosNormaLegalForm.value);
        });
    }

    createDatosNormaLegalForm()
    {
        return this.formBuilder.group({
            tipoNormaLegal      : [this.cargo.tipoNormaLegal],
            numeroNormaLegal    : [this.cargo.numeroNormaLegal],
            fechaNormaLegal     : [this.cargo.fechaNormaLegal],
            observaciones       : [this.cargo.observaciones]
        });
    }

    resetForm(){
        formUtils.resetForm(this.datosNormaLegalForm, this._form);
    }

}
