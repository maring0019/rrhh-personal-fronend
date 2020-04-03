import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { Agente } from 'src/app/models/Agente';
import { NormaLegal } from 'src/app/models/NormaLegal';

import { AgenteService } from 'src/app/services/agente.service';
import { AgenteDatosNormaLegalComponent } from 'src/app/modules/agente/pages/registro/datos-historia-laboral/datos-norma-legal/agente-datos-norma-legal.component';


@Component({
    selector: 'app-agente-reactivar',
    templateUrl: './agente-reactivar.html'
  })

export class AgenteReactivarComponent implements OnInit {
    @Input() agente: Agente;

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FormGroupDirective) _form;
    @ViewChild(AgenteDatosNormaLegalComponent) datosNormaLegal: AgenteDatosNormaLegalComponent;

    public form: FormGroup;
    public normaLegal:NormaLegal = new NormaLegal();
    
    constructor(
        private formBuilder: FormBuilder,
        private agenteService: AgenteService){}

    ngOnInit() {
        this.form = this.initForm(); 
    }
    
    initForm()
        {
            return this.formBuilder.group({
                fecha              : [new Date()],
                causa              : []
            });
        }
  

    public cancelar(){
        this.resetForms();
        this.cancel.emit();
    }


    public guardar(){
        if (this.form.invalid || this.datosNormaLegal.datosNormaLegalForm.invalid) {
            formUtils.markFormAsInvalid(this.form);
            formUtils.markFormAsInvalid(this.datosNormaLegal.datosNormaLegalForm)
            return;
        }
        let datosReactivacion = {
            fecha: this.form.value.fecha,
            causa: this.form.value.causa,
            normaLegal : new NormaLegal(this.datosNormaLegal.datosNormaLegalForm.value)
        }

        this.agenteService.reactivar(this.agente, datosReactivacion)
            .subscribe(
                data=> {
                    this.success.emit(data);
                    this.resetForms();
                },
                error => this.error.emit(error)
            )
    }

    public resetForms(){
        formUtils.resetForm(this.form, this._form);
        this.datosNormaLegal.resetForm();
    }
}