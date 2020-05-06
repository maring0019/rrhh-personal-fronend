import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Agente } from 'src/app/models/Agente';
import { HistoriaAgenteReactivacion } from 'src/app/models/HistoriaAgenteReactivacion';

import { AgenteService } from 'src/app/services/agente.service';
import { AgenteReactivarFormComponent } from 'src/app/modules/agente/components/agente-reactivar/agente-reactivar-form.component';


@Component({
    selector: 'app-agente-reactivar',
    templateUrl: './agente-reactivar.html'
  })

export class AgenteReactivarComponent {
    @Input() agente: Agente;
    @Input() reactivacion: HistoriaAgenteReactivacion = new HistoriaAgenteReactivacion();
    @Input() editable: Boolean = true;

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(AgenteReactivarFormComponent) reactivacionFormComponent: AgenteReactivarFormComponent;
    
    constructor(private agenteService: AgenteService){}
    
    public cancelar(){
        this.reactivacionFormComponent.resetForms();
        this.cancel.emit();
    }

    public guardar(){
        if (this.reactivacionFormComponent.invalid()) return;
        
        let datosReactivacion = this.reactivacionFormComponent.values();
        this.agenteService.reactivar(this.agente, datosReactivacion)
            .subscribe(
                data=> {
                    this.success.emit(data);
                    this.reactivacionFormComponent.resetForms();
                },
                error => this.error.emit(error)
            )
    }
}