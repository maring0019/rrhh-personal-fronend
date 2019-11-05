import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DropdownItem, Plex } from '@andes/plex';
import { CRUDItemListComponent } from 'src/app/modules/tm/components/crud/list/item/crud-item-list.component';

import { Parte } from 'src/app/models/Parte';
import { ParteService } from 'src/app/services/parte.service';


@Component({
    selector: 'app-parte-item-list',
    templateUrl: './parte-item-list.html',
})
export class ParteItemListComponent extends CRUDItemListComponent{

    public parteSeleccionado: Parte;  
    
    constructor(
            public router: Router,
            public plex: Plex,
            private parteService: ParteService) {
        super(router, plex);
    }


    public procesarParte(obj){
        this.parteService.procesar(obj)
            .subscribe(data=>{
                this.plex.info('info', 'Parte procesado correctamente')
                    .then( e => {
                });
            })
    }

    public onNavigate(objeto) {
        if (objeto.id){
            this.router.navigate(['/partes/:id/agentes' , { id: objeto.id }]);
        }
        else{
            this.router.navigate(['/objetos/registro']);
        }
    }

} 