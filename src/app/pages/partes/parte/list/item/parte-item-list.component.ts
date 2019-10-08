import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DropdownItem, Plex } from '@andes/plex';
import { CRUDItemListComponent } from 'src/app/modules/tm/components/crud/list/item/crud-item-list.component';


@Component({
    selector: 'app-parte-item-list',
    templateUrl: './parte-item-list.html',
})
export class ParteItemListComponent extends CRUDItemListComponent{
    
    constructor(public router: Router, public plex: Plex) {
        super(router, plex);
    }

    public verPartesAgentes(){
        console.log('Mostrar los partes de los agentes');
    }

} 