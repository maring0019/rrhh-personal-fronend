import { Component, HostBinding, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Plex } from '@andes/plex';

import { Agente } from 'src/app/models/Agente';
import { HistoriaAgenteSituacion } from 'src/app/models/HistoriaAgenteSituacion';

import { AgenteService } from 'src/app/services/agente.service';

import { HistoriaLaboralFormComponent } from 'src/app/modules/agente/components/agente-historia-laboral/historia-laboral-form.component';

@Component({
    selector: 'app-historia-laboral-create',
    templateUrl: './historia-laboral-create.html'
  })

export class HistoriaLaboralCreateComponent {
    @Input() agente: Agente;
    @Input() historia: HistoriaAgenteSituacion = new HistoriaAgenteSituacion();
    @Input() editable: Boolean = true;

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(HistoriaLaboralFormComponent) historiaFormComponent: HistoriaLaboralFormComponent;
     
    @HostBinding('class.plex-layout') layout = true;
    
    constructor(
        private agenteService:AgenteService,
        public plex: Plex
        ){}

    guardar(){
        if (this.historiaFormComponent.invalid()) {
            this.plex.info('danger', 'Debe completar todos los datos obligatorios');
        }
        else{
            let datosHistoria = this.historiaFormComponent.values();
            this.addHistoriaLaboral(datosHistoria);
        }        
    }

    addHistoriaLaboral(situacionLaboral:any){
        this.agenteService.addHistoriaLaboral(this.agente, situacionLaboral)
            .subscribe( agente => {
                // Try to save files TODO REVIEW THIS
                // this.datosNormaLegal.fileManager.saveFileChanges(agente.situacionLaboral.normaLegal);
                this.historiaFormComponent.resetForms();
                this.success.emit(agente);
                // TODO emit errors!!
        })
    }

    public cancelar(){
        this.historiaFormComponent.resetForms();
        this.cancel.emit();
    }

}