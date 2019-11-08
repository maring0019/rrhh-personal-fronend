import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

import { CRUDListComponent } from 'src/app/modules/tm/components/crud/list/crud-list.component';

import { ParteAgenteSearchFormComponent } from './search/parte-agente-search.component';
import { ParteAgenteItemListComponent } from './item/parte-agente-item-list.component';
import { Parte } from 'src/app/models/Parte';
import { ParteService } from 'src/app/services/parte.service';
import { IActionEvent } from '../../../../models/IActionEvent';


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
    public editionEnabled = false;
    public estadoPresentacionConfirmada;

    private parteToUpdate:Parte; 

    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver,
        public plex: Plex,
        private parteService: ParteService) {
        super(router, resolver); 
    }

    public ngOnInit() {
        super.ngOnInit();
        // Como el componente searchForm se crea dinamicamente nos
        // suscribimos aqui para eschuchar cuando un parte ha sido
        // encontrado correctamente en la busqueda realizada
        this.searchFormComponentRef.instance.searchEndParte
            .subscribe(parte => {
                this.onSearchParte(parte);
            }); 
    }

    public onSearchParte(parte){
        this.parteToUpdate = parte;
        if (parte.estado && parte.estado.nombre == "Presentación total") {
            this.estadoPresentacionConfirmada = true;
        }
        else {
            this.estadoPresentacionConfirmada = false;
        }
        this.enableEdition(false);
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
                this.plex.info('info', `Parte actualizado correctamente. El parte
                    se encuentra aún es estado de 'Presentación Parcial'`)
                    .then( e => {
                        this.refreshSearch();
                });
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
                this.plex.info('info', `Parte actualizado y confirmado correctamente.
                    El parte se encuentra ahora en estado de 'Presentación Total'`)
                    .then( e => {
                        this.refreshSearch();
                });
        })
    }

    public onEnableEdition(){
        this.enableEdition(true);
    }

    public onCancelEdition(){
        this.refreshSearch();
    }

    
    /**
     * Guardado de un parte en edicion, que ya habia sido confirmado
     * previamente. El estado del parte continua como Presentacion Total. 
     * Se debe notificar a los responsables que corresponda de estos
     * cambios (responsabilidad del endpoint confirmar)
     */
    public onSaveEdition(){
        this.parteService.confirmar(this.parteToUpdate, this.objects)
        .subscribe(data => {
            // TODO Mejorar el manejo de errores
            // TODO Terminar de definir a quienes se notifica y que se notifica
            this.plex.info('info', `Parte editado correctamente. Se ha notificado
                a los responsables de esta actualización.`)
                .then( e => {
                    this.refreshSearch();
            });
    })
    }

    private refreshSearch(){
        this.searchFormComponentRef.instance.buscar();
    }

    public onCancel(){}

    /**
     * Oculta/muestra los botones de guardar y cancelar al editar un parte.
     * Ademas habilita o no la edicion 'inline' en el listado de partes de
     * los agentes (puntualmente la carga/edicion de la justificacion de cada
     * parte y sus observaciones).
     * @param enable indica si se habiita o no la edicion
     */
    private enableEdition(enable:boolean){
        if (enable){
            this.editionEnabled = true;
            this.itemListComponentRef.instance.editionEnabled = true;
        }
        else{
            this.editionEnabled = false;
            if (this.estadoPresentacionConfirmada) {
                this.itemListComponentRef.instance.editionEnabled = false;
            }
            else{
                this.itemListComponentRef.instance.editionEnabled = true;
            }
        }
    }
}