import { Component, HostBinding, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Plex } from '@andes/plex';

import { Agente } from 'src/app/models/Agente';
import { Nota } from 'src/app/models/Nota';

import { NotaService } from 'src/app/services/nota.service';
import { AgenteNotasFormComponent } from 'src/app/modules/agente/components/agente-notas/list/create-update/agente-notas-form.component';


@Component({
    selector: 'app-agente-notas-create-update',
    templateUrl: './agente-notas-create-update.html'
  })
export class AgenteNotasCreateUpdateComponent {
    @Input() agente: Agente;
    @Input() item: Nota = new Nota();
    @Input() editable: Boolean = true;

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(AgenteNotasFormComponent) notaFormComponent: AgenteNotasFormComponent;
     
    @HostBinding('class.plex-layout') layout = true;
    
    constructor(
        private notaService:NotaService,
        public plex: Plex
        ){}

    guardar(){
        if (this.notaFormComponent.invalid()) {
            this.plex.info('danger', 'Debe completar todos los datos obligatorios');
        }
        else{
            let datosNota = this.notaFormComponent.form.value;
            this.addNota(datosNota);
        }        
    }

    addNota(nota:any){
        this.notaService.post(nota)
            .subscribe( nota => {
                this.notaFormComponent.resetForms();
                this.success.emit(nota);
                // TODO emit errors!!
        })
    }

    public cancelar(){
        this.notaFormComponent.resetForms();
        this.cancel.emit();
    }

}