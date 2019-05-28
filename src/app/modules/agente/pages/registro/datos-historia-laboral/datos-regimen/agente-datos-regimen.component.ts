import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RegimenHorarioService } from 'src/app/services/regimen-horario.service';

import { Regimen } from 'src/app/models/Regimen';
import { RegimenHorario } from 'src/app/models/RegimenHorario';


@Component({
    selector: 'agente-datos-regimen',
    templateUrl: './agente-datos-regimen.html',

})
export class AgenteDatosRegimenComponent implements OnInit {
    @Input() regimen: Regimen;
    @Output() outputRegimen: EventEmitter<Regimen> = new EventEmitter<Regimen>();

    datosRegimenForm: FormGroup;
    regimenHorarios: RegimenHorario[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private regimenHorarioService: RegimenHorarioService
            ){}

    ngOnInit() {
        // Init Regimenes Horario
        this.regimenHorarioService.get({})
            .subscribe(data => {
                this.regimenHorarios = data;
        });

        this.datosRegimenForm = this.createDatosRegimenForm();
        this.datosRegimenForm.valueChanges.subscribe(() => {
            this.outputRegimen.emit(this.datosRegimenForm.value);
        });
    }

    createDatosRegimenForm(){
        return this.formBuilder.group({
            regimenHorario         : [this.regimen.regimenHorario],
            prolongacionJornada    : [this.regimen.prolongacionJornada],
            actividadCritica       : [this.regimen.actividadCritica],
            dedicacionExclusiva    : [this.regimen.dedicacionExclusiva],
            tiempoPleno            : [this.regimen.tiempoPleno],
            guardiasPasivas        : [this.regimen.guardiasPasivas],
            guardiasActivas        : [this.regimen.guardiasActivas]
            
        });
    }

}