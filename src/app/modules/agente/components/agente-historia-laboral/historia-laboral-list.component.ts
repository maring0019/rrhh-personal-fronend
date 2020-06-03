import { Component, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Type } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

import { Agente } from 'src/app/models/Agente';
import { ObjectService } from 'src/app/services/tm/object.service';
import { ModalService } from 'src/app/services/modal.service';
import { AgenteService } from 'src/app/services/agente.service';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { AgenteBajaFormComponent } from 'src/app/modules/agente/components/agente-baja/agente-baja-form-component';
import { HistoriaLaboralFormComponent } from 'src/app/modules/agente/components/agente-historia-laboral/historia-laboral-form.component';


@Component({
    selector: 'app-historia-laboral-list',
    templateUrl: './historia-laboral-list.html'
  })

export class HistoriaLaboralListComponent extends ABMListComponent {
    @Input() editable:Boolean;
    @Input() agente: Agente;
    @Input() historiaLaboral:any[];

    @Output() changed: EventEmitter<Agente> = new EventEmitter<Agente>();

    @ViewChild(AgenteBajaFormComponent) bajaFormComponent: AgenteBajaFormComponent;
    @ViewChild(HistoriaLaboralFormComponent) historiaFormComponent: HistoriaLaboralFormComponent;

    @ViewChild('dynamicBajaForm', { read: ViewContainerRef }) bajaContainerRef: ViewContainerRef;
    @ViewChild('dynamicReactivacionForm', { read: ViewContainerRef }) reactivacionContainerRef: ViewContainerRef;
    @ViewChild('dynamicModificacionForm', { read: ViewContainerRef }) modificacionContainerRef: ViewContainerRef;
    formComponentRef:any;

    public readonly modal_id_create:string = 'create';
    public readonly modal_id_baja:string = 'baja';
    public readonly modal_id_modificacion:string = 'modificacion';
    public readonly modal_id_reactivacion:string = 'reactivacion';

    public canEditHistoria = false;

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private agenteService: AgenteService,
        private modalService: ModalService,
        private plex: Plex,
        private resolver: ComponentFactoryResolver){
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
        this.destroyHistoriaFormComponent();
        this.modalService.close(modalId);

    }

    public onItemView(item:any){
        this.viewOrEdit(item, false);
    }

    public onItemEdit(item:any){
        this.viewOrEdit(item, true);
    }

    public changeCanEditHistoria(){
        this.canEditHistoria = !this.canEditHistoria;
        this.formComponentRef.instance.editable = this.canEditHistoria;
    }

    /**
     * Crea dinamicamente los formularios para baja, reactivacion o modificacion
     * segun corresponda de acuerdo al 'tipo' de item seleccionado en el listado.
     * @param component 
     * @param containerRef 
     */
    createHistoriaFormComponent(component:Type, containerRef) {
        if (this.formComponentRef) this.formComponentRef.destroy();
        const factory = this.resolver.resolveComponentFactory(component);
        this.formComponentRef = containerRef.createComponent(factory);
        // Pass to child Input() parameters value
        this.formComponentRef.instance.agente = this.agente;
        this.formComponentRef.instance.item = this.itemSelected.changeset;
        this.formComponentRef.instance.editable = this.canEditHistoria;
    }

    destroyHistoriaFormComponent() {
        if (this.formComponentRef) this.formComponentRef.destroy();
    }

    public onItemDelete(item:any){
        this.agenteService.deleteHistoriaLaboral(this.agente, item)
            .subscribe(
                agente => {
                    this.items = this.items.filter(x => x._id != item._id);
                    this.plex.info('success', 'Se eliminó correctamente el Item');
                },
                error => this.plex.info('error', 'No se pudo eliminar correctamente el Item')
            )
    }
  

    private viewOrEdit(item:any, canEdit:boolean){
        this.itemSelected = item;
        this.canEditHistoria = canEdit;
        switch (item.tipo) {
            case 'modificacion':
            case 'alta':
                this.createHistoriaFormComponent(HistoriaLaboralFormComponent, this.modificacionContainerRef);
                this.onOpenModal(this.modal_id_modificacion);
                break;
            case 'baja':
                this.createHistoriaFormComponent(AgenteBajaFormComponent, this.bajaContainerRef);
                this.onOpenModal(this.modal_id_baja);
                break;
        }
    }

    public onSuccessHistoriaLaboralCreate(agente:Agente){
        this.changed.emit(agente);
        this.modalService.close(this.modal_id_create);
        this.plex.info('success', 'Se actualizó correctamente la Historia Laboral del Agente');

    }


    /**
     * 
     * @param modalId 
     */
    public updateHistoria(modalId:string){
        let formComponent = this.formComponentRef.instance;
        if (formComponent.invalid()) return;
        let changeset = formComponent.values();
        let datosHistoria = {
            _id: this.itemSelected._id,
            tipo: this.itemSelected.tipo,
            changeset: changeset
        }
        this.agenteService.updateHistoriaLaboral(this.agente, datosHistoria)
            .subscribe(
                agente => {
                    // Actualizamos la info de los archivos asociados a la norma legal
                    // si corresponde. Tener cuidado de no modificar el nombre con el 
                    // que se referencia a la norma legal en el formComponent
                    const idx = agente.historiaLaboral.findIndex((obj => obj._id == datosHistoria._id));
                    const historiaUpdated = agente.historiaLaboral[idx]
                    formComponent.datosNormaLegal.fileManager.saveFileChanges(historiaUpdated.changeset.normaLegal);
                    this.onCancelModal(modalId);
                    this.items = agente.historiaLaboral;
                    this.plex.info('success', 'Se actualizó correctamente el Item');
                },
                 error => this.plex.info('error', 'No se pude actualizar correctamente el Item')
                 
            )
    }

    public onSuccessBaja(event){

    }

    public onErrorBaja(event){

    }
}