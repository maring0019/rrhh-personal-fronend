import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DropdownItem, Plex } from '@andes/plex';
import { CRUDItemListComponent } from 'src/app/modules/tm/components/crud/list/item/crud-item-list.component';

import { ModalService } from 'src/app/services/modal.service';
import { ParteService } from 'src/app/services/parte.service';

import { Parte } from 'src/app/models/Parte';
import { ParteAgente } from 'src/app/models/ParteAgente';


@Component({
    selector: 'app-parte-item-list',
    templateUrl: './parte-item-list.html',
})
export class ParteItemListComponent extends CRUDItemListComponent{

    // Almacena los partes de los agentes para mostrar en el modal cuando se
    // selecciona un parte en particular.
    public partesAgenteSeleccionado: ParteAgente[];
    public parteSeleccionado: Parte;  
    
    constructor(
        public router: Router,
        public plex: Plex,
        private parteService: ParteService,
        private modalService: ModalService) {
        super(router, plex);
    }

    public verPartesAgentes(obj){
        this.parteSeleccionado = obj;
        this.searchPartesAgentes(this.parteSeleccionado.id)
        this.modalService.open('modal-partes-agente');
    }

    public onCloseModal(){
        this.modalService.close('modal-partes-agente');
    }

    public updateEstadoProcesado(obj){
        console.log('Se actualizo el estado');
        console.log(obj);
    }

    public onNavigate(objeto) {
        if (objeto.id){
            this.router.navigate(['/partes/:id/agentes' , { id: objeto.id }]);
        }
        else{
            this.router.navigate(['/objetos/registro']);
        }
    }


    searchPartesAgentes(parteID){
        this.parteService.getPartesAgentes(parteID).subscribe(
            objects => {
                this.partesAgenteSeleccionado = objects;
            },
            (err) => {
                this.partesAgenteSeleccionado = [];
            }
        );
    }

} 