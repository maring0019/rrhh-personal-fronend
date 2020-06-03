import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Agente } from 'src/app/models/Agente';
import { HistoriaAgenteReactivacion } from 'src/app/models/HistoriaAgenteReactivacion';

import { AgenteService } from 'src/app/services/agente.service';

import { HistoriaLaboralFormComponent } from 'src/app/modules/agente/components/agente-historia-laboral/historia-laboral-form.component';
import { Plex } from '@andes/plex';



@Component({
    selector: 'app-agente-reactivar',
    templateUrl: './agente-reactivar.html'
  })

export class AgenteReactivarComponent {
    @Input() agente: Agente;
    @Input() item: HistoriaAgenteReactivacion = new HistoriaAgenteReactivacion();
    @Input() editable: Boolean = true;

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    // Para la reactivacion utilizamos el mismo formulario que para los cambios
    // de la situacion del agente.
    @ViewChild(HistoriaLaboralFormComponent) historiaFormComponent: HistoriaLaboralFormComponent;
    
    constructor(
        private agenteService: AgenteService,
        public plex: Plex){}
    
    public cancelar(){
        this.historiaFormComponent.resetForms();
        this.cancel.emit();
    }

    public guardar(){
        if (this.historiaFormComponent.invalid()) {
            this.plex.info('danger', 'Debe completar todos los datos obligatorios');
        }
        else{
            let datosReactivacion = this.historiaFormComponent.values();
            this.agenteService.reactivar(this.agente, datosReactivacion)
            .subscribe( agente => {
                // Try to save files
                this.historiaFormComponent.datosNormaLegal.fileManager.saveFileChanges(agente.situacionLaboral.normaLegal);
                this.historiaFormComponent.resetForms();
                this.success.emit(agente);
        })
        }        
    }
}