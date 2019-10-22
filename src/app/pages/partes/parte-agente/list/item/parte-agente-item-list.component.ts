import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DropdownItem, Plex } from '@andes/plex';
import { CRUDItemListComponent } from 'src/app/modules/tm/components/crud/list/item/crud-item-list.component';
import { ModalService } from 'src/app/services/modal.service';


@Component({
    selector: 'app-parte-agente-item-list',
    templateUrl: './parte-agente-item-list.html',
})
export class ParteAgenteItemListComponent extends CRUDItemListComponent{

    @Input() readonly = false;

    public justificaciones = [];
    
    constructor(public router: Router,
            public plex: Plex,
            private modalService: ModalService) {
        super(router, plex);
    }

    public accionToDo(){
        console.log('Accion a realizar');
        this.modalService.close('modal-partes-agente');
        // this.modalService.open('modal-carga-articulo');
    }

    // public updateEstadoProcesado(obj){
    //     console.log('Se actualizo el estado');
    //     console.log(obj);
    // }

} 