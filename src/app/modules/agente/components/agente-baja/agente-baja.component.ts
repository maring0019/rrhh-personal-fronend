import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Agente } from 'src/app/models/Agente';
import { HistoriaAgenteBaja } from 'src/app/models/HistoriaAgenteBaja';

import { AgenteService } from 'src/app/services/agente.service';

import { AgenteBajaFormComponent } from './agente-baja-form-component';


@Component({
    selector: 'app-agente-baja',
    templateUrl: './agente-baja.html'
  })

export class AgenteBajaComponent {
    @Input() agente: Agente;
    @Input() baja: HistoriaAgenteBaja = new HistoriaAgenteBaja();
    @Input() editable: Boolean = true;

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(AgenteBajaFormComponent) bajaFormComponent: AgenteBajaFormComponent;
    
    constructor(private agenteService: AgenteService){}
  
    public cancelar(){
        this.bajaFormComponent.resetForms();
        this.cancel.emit();
    }

    public guardar(){
        if (this.bajaFormComponent.invalid()) return;
        let datosBaja = this.bajaFormComponent.values();
        this.agenteService.baja(this.agente, datosBaja)
            .subscribe(
                data=> {
                    this.success.emit(data);
                    this.bajaFormComponent.resetForms();
                },
                error => this.error.emit(error)
            )
    }
}