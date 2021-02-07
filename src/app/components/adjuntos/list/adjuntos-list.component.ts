import {
    Component,
    Input,
    ComponentFactoryResolver,
    Output,
    EventEmitter,
    ViewChild,
    ViewContainerRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { Plex } from "@andes/plex";

import { ABMListComponent } from "src/app/modules/tm/components/crud/abm-list.component";
import { ObjectService } from "src/app/services/tm/object.service";
import { ModalService } from "src/app/services/modal.service";
import { AdjuntoService } from 'src/app/services/adjunto.service';

import { AdjuntosCreateUpdateComponent } from '../create-update/adjuntos-create-update.component';
import { Adjunto } from 'src/app/models/Adjunto';


@Component({
    selector: "app-adjuntos-list",
    templateUrl: "./adjuntos-list.html",
})
export class AdjuntosListComponent extends ABMListComponent {
    @Input() editable: Boolean;
    @Input() object: any;
    @Input() adjuntos: Adjunto[];

    @Output() changed: EventEmitter<Adjunto> = new EventEmitter<Adjunto>();

    @ViewChild(AdjuntosCreateUpdateComponent)
    createUpdateComponent: AdjuntosCreateUpdateComponent;
    @ViewChild("createUpdateDynamicComponent", { read: ViewContainerRef })
    createUpdateContainerRef: ViewContainerRef;
    componentRef: any;

    public modelName = "adjunto";

    public readonly modal_id: string = "create_update_adjunto";
    public canEditAdjuntos = false;

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private adjuntoService: AdjuntoService,
        private modalService: ModalService,
        private plex: Plex,
        private resolver: ComponentFactoryResolver
    ) {
        super(router, objectService);
    }

    public ngOnInit() {
        // Los items los inicializamos sencillamente con
        // los valores del Input. No es necesario hacer
        // una busqueda utilizando los servicios.
        this.items = this.adjuntos;
    }

    public onItemCreate() {
        this.itemSelected = null;
        this.createCreateUpdateAdjuntosComponent("create", true);
        this.onOpenModal();
    }

    public onItemDelete(item: any) {
        this.adjuntoService.delete(item._id).subscribe(
            (result) => {
                this.items = this.items.filter((x) => x._id != item._id);
                this.plex.info("success", "Se eliminó correctamente el Item");
            },
            (error) =>
                this.plex.info(
                    "error",
                    "No se pudo eliminar correctamente el Item"
                )
        );
    }

    public onItemEdit(item: any) {
        this.createCreateUpdateAdjuntosComponent("update", true, item);
        this.onOpenModal();
    }

    public onItemView(item: any) {
        this.createCreateUpdateAdjuntosComponent("view", false, item);
        this.onOpenModal();
    }

    public onOpenModal() {
        this.modalService.open(this.modal_id);
    }

    public onCancelModal() {
        this.modalService.close(this.modal_id);
    }

    public onSuccessItemCreate(adjunto: Adjunto) {
        this.modalService.close(this.modal_id);
        this.items.unshift(adjunto);
        this.changed.emit(adjunto);
    }

    public onSuccessItemUpdate(adjunto: Adjunto) {
        this.modalService.close(this.modal_id);
        this.plex.info("success", "Se actualizó correctamente el Item");
        const idx = this.items.findIndex((obj) => obj._id == adjunto._id);
        this.items[idx] = adjunto;
        this.changed.emit(adjunto);
    }

    /**
     * Crea dinamicamente el componente de alta o edicion de adjuntos segun
     * corresponda a la accione enviada por parametro
     * @param action "create" | "update" | "view"
     * @param editable
     * @param item Solo requerido en caso cuando la accion es update or view
     */
    createCreateUpdateAdjuntosComponent(action: String, editable: Boolean, item?) {
        if (this.componentRef) this.componentRef.destroy();

        const factory = this.resolver.resolveComponentFactory(
            AdjuntosCreateUpdateComponent
        );
        this.componentRef = this.createUpdateContainerRef.createComponent(
            factory
        );
        // Pass to child Input() parameters value
        if (action == "create") {
            this.componentRef.instance.object = this.object;
            this.componentRef.instance.editable = editable;
            // Subscribe to child Output() events
            this.componentRef.instance.success.subscribe((adjunto) => {
                this.onSuccessItemCreate(adjunto);
            });
        } else {
            this.componentRef.instance.object = this.object;
            this.componentRef.instance.item = item;
            this.componentRef.instance.editable = editable;
            this.componentRef.instance.success.subscribe((adjunto) => {
                this.onSuccessItemUpdate(adjunto);
            });
        }
        // Subscribe to child Output() events
        this.componentRef.instance.cancel.subscribe((event) => {
            this.onCancelModal();
        });
        this.componentRef.instance.error.subscribe((event) => {
            this.onCancelModal();
        });
    }
}
