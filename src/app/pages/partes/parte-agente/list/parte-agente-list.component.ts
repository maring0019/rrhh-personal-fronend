import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';

import { ParteAgenteSearchFormComponent } from './search/parte-agente-search.component';
import { ParteAgenteItemListComponent } from './item/parte-agente-item-list.component';
import { IActionEvent } from '../../../../models/IActionEvent';
import { Parte } from 'src/app/models/Parte';
import { ParteService } from 'src/app/services/parte.service';

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

    private parteToUpdate:Parte; 

    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver,
        private parteService: ParteService) {
        super(router, resolver); 
    }

    public ngOnInit() {
        super.ngOnInit();

        this.searchFormComponentRef.instance.searchEndParte
            .subscribe(parte => {
                this.onSearchParte(parte);
            }); 
    }

    public onSearchParte(parte){
        this.parteToUpdate = parte;
    }

    public onItemListAction(actionEvent: IActionEvent){
        if (actionEvent.accion == 'edit'){
            this.saveButtonEnabled = true;
        }
    }

    /**
     * Guardado 'temporal' sin confirmacion definitiva de todos los partes
     * de agentes editados en el listado de partes. El estado del parte queda
     * como Presentacion Parcial.
     * El usuario puede continuar realizando cambios hasta confirmar el parte
     * pero los cambios no son notificados para su aprobacion/auditoria.
     */
    public onSavePartes(){
        this.parteService.guardar(this.parteToUpdate, this.objects)
            .subscribe(data => {
                // TODO Mejorar el manejo de errores
                this.refreshSearch();
        })
    }

    
    /**
     * Guardado con confirmacion definitiva de todos los partes de agentes
     * editados en el listado de partes. El estado del parte queda como 
     * Presentacion Total. 
     * El usuario puede continuar realizando cambios sobre el parte pero 
     * debe editarlo en forma explicita y cada cambio es notificado para
     * su aprobacion o auditoria
     */
    public onConfirmarPartes(){
        this.parteService.confirmar(this.parteToUpdate, this.objects)
            .subscribe(data => {
                // TODO Mejorar el manejo de errores
                this.refreshSearch();
        })
    }

    private refreshSearch(){
        this.searchFormComponentRef.instance.buscar();
    }

    public onCancel(){}

    // TODO
    // Revisar que hayan quedado bien el resto de los eventos de salida


}