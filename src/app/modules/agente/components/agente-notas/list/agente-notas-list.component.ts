import { Component, Input, ComponentFactoryResolver, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotaService } from 'src/app/services/nota.service';

import { Agente } from 'src/app/models/Agente';
import { Nota } from 'src/app/models/Nota';
import { AgenteNotasCreateUpdateComponent } from 'src/app/modules/agente/components/agente-notas/list/create-update/agente-notas-create-update.component';


@Component({
    selector: 'app-agente-notas-list',
    templateUrl: './agente-notas-list.html'
  })

export class AgenteNotasListComponent extends ABMListComponent {
    @Input() editable:Boolean;
    @Input() agente: Agente;
    @Input() notas:Nota[];

    @Output() changed: EventEmitter<Nota> = new EventEmitter<Nota>();

    @ViewChild(AgenteNotasCreateUpdateComponent) createUpdateComponent: AgenteNotasCreateUpdateComponent;
    @ViewChild('createUpdateDynamicComponent', { read: ViewContainerRef }) createUpdateContainerRef: ViewContainerRef;
    componentRef:any;

    public readonly modal_id:string = 'create_update_nota';
    public canEditNotas = false;

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private notaService: NotaService,
        private modalService: ModalService,
        private plex: Plex,
        private resolver: ComponentFactoryResolver){
            super(router, objectService)
        }

    public ngOnInit() {
        // Los items los inicializamos sencillamente con 
        // los valores del Input. No es necesario hacer
        // una busqueda utilizando los servicios.
        this.items = this.notas;
    }

    public onItemCreate(){
        this.itemSelected = null;
        this.createCreateUpdateNotasComponent('create', true);
        this.onOpenModal();
    }

    public onItemDelete(item:any){
        this.notaService.delete(item._id)
            .subscribe(
                result => {
                    this.items = this.items.filter(x => x._id != item._id);
                    this.plex.info('success', 'Se eliminó correctamente el Item');
                },
                error => this.plex.info('error', 'No se pudo eliminar correctamente el Item')
        )
    }

    public onItemEdit(item:any){
        this.createCreateUpdateNotasComponent('update', true, item);
        this.onOpenModal();
    }

    public onItemView(item:any){
        this.createCreateUpdateNotasComponent('view', false, item);
        this.onOpenModal();
    }


    public onOpenModal(){
        this.modalService.open(this.modal_id);
    }

    public onCancelModal(){
        this.modalService.close(this.modal_id);
    }

    public onSuccessItemCreate(nota:Nota){
        console.log("Nueva NOTA",nota);
        this.modalService.close(this.modal_id);
        this.plex.info('success', 'Se ingresó correctamente la nota del Agente');
        this.items.unshift(nota);
        this.changed.emit(nota);
    }

    public onSuccessItemUpdate(nota:Nota){
        this.modalService.close(this.modal_id);
        this.plex.info('success', 'Se actualizó correctamente el Item');
        const idx = this.items.findIndex((obj => obj._id == nota._id));
        this.items[idx] = nota;
        this.changed.emit(nota);
    }

      /**
     * Crea dinamicamente el componente de alta o edicion de notas segun
     * corresponda a la accione enviada por parametro
     * @param action "create" | "update" | "view"
     * @param editable
     * @param item Solo requerido en caso cuando la accion es update or view
     */
    createCreateUpdateNotasComponent(action:String, editable:Boolean, item?) {
        if (this.componentRef) this.componentRef.destroy();
        
        const factory = this.resolver.resolveComponentFactory(AgenteNotasCreateUpdateComponent);
        this.componentRef = this.createUpdateContainerRef.createComponent(factory);
        // Pass to child Input() parameters value
        if (action=='create'){
            this.componentRef.instance.agente = this.agente;
            this.componentRef.instance.editable = editable;
            // Subscribe to child Output() events
            this.componentRef.instance.success
                .subscribe( nota => {
                    this.onSuccessItemCreate(nota)
                }); 
        }
        else{
            this.componentRef.instance.agente = this.agente;
            this.componentRef.instance.item = item;
            this.componentRef.instance.editable = editable;
            this.componentRef.instance.success
                .subscribe( nota => {
                    this.onSuccessItemUpdate(nota)
                });
        }
        // Subscribe to child Output() events
        this.componentRef.instance.cancel
            .subscribe(event => {
                this.onCancelModal();
            });
        this.componentRef.instance.error
            .subscribe(event => {
                this.onCancelModal();
            });
    }

}