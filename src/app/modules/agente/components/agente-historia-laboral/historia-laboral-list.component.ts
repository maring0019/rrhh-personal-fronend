import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ModalService } from 'src/app/services/modal.service';
import { Agente } from 'src/app/models/Agente';
import { Plex } from '@andes/plex';
import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-historia-laboral-list',
    templateUrl: './historia-laboral-list.html'
  })

export class HistoriaLaboralListComponent extends ABMListComponent {
    @Input() editable:Boolean;
    @Input() agente: Agente;
    @Input() historiaLaboral:any[];

    @Output() changed: EventEmitter<Agente> = new EventEmitter<Agente>();

    public readonly modal_id_create = 'create';
    public readonly modal_id_baja = 'baja';
    public readonly modal_id_modificacion = 'modificacion';
    public readonly modal_id_reactivacion = 'reactivacion';

    public canEditHistoria = false;

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private modalService: ModalService,
        private plex: Plex){
            super(router, objectService)
        }

    public ngOnInit() {
        // Los items los inicializamos sencillamente con 
        // los valores del Input. No es necesario hacer
        // una busqueda utilizando los servicios.
        this.items = this.historiaLaboral;
    }

    public nuevaHistoriaLaboral(){
        this.onOpenModal(this.modal_id_create);
    }

    public onOpenModal(modalId:string){
        this.modalService.open(modalId);
    }

    public onCancelModal(modalId:string){
        this.modalService.close(modalId);
    }

    public onItemView(item:any){
        this.itemSelected = item;
        switch (item.tipo) {
            case 'modificacion':
            case 'alta':
                this.onOpenModal(this.modal_id_modificacion);
                break;
            case 'baja':
                this.canEditHistoria = false;
                this.onOpenModal(this.modal_id_baja);
                break;
            case 'reactivacion':
                this.onOpenModal(this.modal_id_reactivacion);
                break;
        }

    }

    public onItemDelete(item:any){
        this.items = this.items.filter(x => x._id != item._id);
        // this.objectService.delete(this.dataService, item._id)
        //     .subscribe(
        //         data => {
        //             this.items = this.items.filter(x => x._id != item._id);
        //         },
        //         error => {}
        //     )
    }

    public onItemEdit(obj:any){
        this.itemSelected = obj;
    }

    public onSuccessHistoriaLaboralCreate(agente:Agente){
        // this.historiaLaboral = agente.historiaLaboral;
        this.changed.emit(agente);
        this.modalService.close(this.modal_id_create);
        this.plex.info('success', 'Se actualizó correctamente la Historia Laboral del Agente');

    }


    public onSuccessBaja(event){

    }

    public onErrorBaja(event){

    }
}