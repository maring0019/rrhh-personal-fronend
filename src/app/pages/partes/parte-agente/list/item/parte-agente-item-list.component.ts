import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DropdownItem, Plex } from '@andes/plex';
import { CRUDItemListComponent } from 'src/app/modules/tm/components/crud/list/item/crud-item-list.component';


@Component({
    selector: 'app-parte-agente-item-list',
    templateUrl: './parte-agente-item-list.html',
})
export class ParteAgenteItemListComponent extends CRUDItemListComponent{

    @Input() readOnly = false;

    public justificaciones = [];
    
    constructor(public router: Router, public plex: Plex) {
        super(router, plex);
    }

    public accionToDo(){
        console.log('Accion a realizar');
    }

    // public updateEstadoProcesado(obj){
    //     console.log('Se actualizo el estado');
    //     console.log(obj);
    // }

} 