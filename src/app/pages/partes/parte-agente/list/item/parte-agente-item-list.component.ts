import { Component, Input, Output, EventEmitter } from '@angular/core';
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

    @Output() changed: EventEmitter<any> = new EventEmitter<any>();

    public justificaciones = [];
    
    constructor(public router: Router,
            public plex: Plex,
            private modalService: ModalService) {
        super(router, plex);
    }

    public accionToDo(obj, index){
        this.seleccionarObjeto(obj, index);
        this.modalService.open('modal-carga-articulo');
    }

    public onCloseModal(){
        this.modalService.close('modal-carga-articulo');
    }

    public onSuccess(data){
        this.plex.info('info', 'Ausentismo ingresado correctamente')
            .then( e => {
                this.onCloseModal();
                this.changed.emit();
        });
    }

    public onErrors(error){
        if(error){
            console.log('Errores');
            console.log(error)
            // this.plex.info('info', error);
        }
        else{
            this.plex.info('info', 'Debe completar todos los datos obligatorios');
        }
        
    }

    public onWarnings(warnings){
        if (warnings && warnings.length){
            let textWarning = ``;
            for (const warn of warnings){
                textWarning = `${textWarning}<p> ${warn} </p>`
            }
            this.plex.info('info', `<p>El articulo seleccionado presenta los
                                    siguientes problemas: ${textWarning} </p>`) ;
        }
    }


    // public updateEstadoProcesado(obj){
    //     console.log('Se actualizo el estado');
    //     console.log(obj);
    // }

} 