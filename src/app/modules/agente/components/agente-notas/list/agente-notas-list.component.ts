import { Component, Input, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';
import { ModalService } from 'src/app/services/modal.service';
import { AgenteService } from 'src/app/services/agente.service';

import { Agente } from 'src/app/models/Agente';
import { Nota } from 'src/app/models/Nota';

@Component({
    selector: 'app-agente-notas-list',
    templateUrl: './agente-notas-list.html'
  })

export class AgenteNotasListComponent extends ABMListComponent {
    @Input() editable:Boolean;
    @Input() agente: Agente;
    @Input() notas:Nota[];

    @Output() changed: EventEmitter<Nota> = new EventEmitter<Nota>();

    public readonly modal_id_create:string = 'create_nota';
    public canEditNotas = false;

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
        this.items = this.notas;
    }

    public nuevaNota(){
        this.onOpenModal(this.modal_id_create);
    }

    public onOpenModal(modalId:string){
        this.modalService.open(modalId);
    }

    public onCancelModal(modalId:string){
        // this.destroyHistoriaFormComponent();
        this.modalService.close(modalId);
    }

    public onSuccessNotaCreate(nota:Nota){
        this.changed.emit(nota);
        this.modalService.close(this.modal_id_create);
        this.plex.info('success', 'Se ingresó correctamente la nota del Agente');
        this.notas.push(nota);
    }

}