import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';

import { ParteAgenteSearchFormComponent } from './search/parte-agente-search.component';
import { ParteAgenteItemListComponent } from './item/parte-agente-item-list.component';
import { IActionEvent } from '../../../../models/IActionEvent';
import { ParteAgenteService } from 'src/app/services/parte-agente.service';

@Component({
    selector: 'app-parte-agente-list',
    templateUrl: './parte-agente-list.html',
})
export class ParteAgenteListComponent extends CRUDListComponent implements OnInit {

    public searchFormComponent = ParteAgenteSearchFormComponent;
    public itemListComponent = ParteAgenteItemListComponent;
    public titulo = 'Partes Diarios Agentes';
    public canCreateObject: boolean = false;

    public saveButtonEnabled = false; 

    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver,
        private parteAgenteService: ParteAgenteService) {
        super(router, resolver); 
    }

    public ngOnInit() {
        super.ngOnInit();
    }

    public onItemListAction(actionEvent: IActionEvent){
        if (actionEvent.accion == 'edit'){
            this.saveButtonEnabled = true;
        }
    }

    /**
     * Guardado de todos los partes de agentes editados en 
     * el listado de partes (justificacion, obs, etc)
     */
    public onSave(){
        this.parteAgenteService.patch(this.itemListComponentRef.instance.objects)
            .subscribe(data => {
                // TODO Mejorar el manejo de errores
                this.refreshSearch();
        })
    }

    private refreshSearch(){
        this.searchFormComponentRef.instance.buscar();
    }

    // TODO
    // Revisar que hayan quedado bien el resto de los eventos de salida


}