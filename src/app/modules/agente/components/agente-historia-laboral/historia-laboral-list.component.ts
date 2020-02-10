import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ModalService } from 'src/app/services/modal.service';
import { Agente } from 'src/app/models/Agente';
import { Plex } from '@andes/plex';

@Component({
    selector: 'app-historia-laboral-list',
    templateUrl: './historia-laboral-list.html'
  })

export class HistoriaLaboralListComponent {
    @Input() editable:Boolean;
    @Input() agente: Agente;
    @Input() historiaLaboral:any[];

    @Output() changed: EventEmitter<Agente> = new EventEmitter<Agente>();

    public readonly modal_id = 'modal-historia-laboral-create';
    public itemSelected:any;

    constructor(private modalService: ModalService, private plex: Plex){}

    public nuevaHistoriaLaboral(){
        this.modalService.open(this.modal_id);
    }

    public onCancelModal(modalId:string){
        this.modalService.close(modalId);
    }

    public onSelectionChanged(e){
        this.itemSelected = e;
    }

    public onEdit(e){
        this.itemSelected = e;
    }

    public onDelete(e){
        this.itemSelected = e;
    }

    public onSuccessHistoriaLaboralCreate(agente:Agente){
        // this.historiaLaboral = agente.historiaLaboral;
        this.changed.emit(agente);
        this.modalService.close(this.modal_id);
        this.plex.info('success', 'Se actualizó correctamente la Historia Laboral del Agente');

    }
}