import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-historia-laboral-list',
    templateUrl: './historia-laboral-list.html'
  })

export class HistoriaLaboralListComponent {
    @Input() editable:Boolean;
    @Input() agente;
    @Input() historiaLaboral:any[];

    constructor(private modalService: ModalService){}

    public nuevaHistoriaLaboral(){
        this.modalService.open('modal-historia-laboral-create');
    }

    public onCancelModal(modalId:string){
        this.modalService.close(modalId);
    }
}