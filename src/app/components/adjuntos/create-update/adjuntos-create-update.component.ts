import { Component, HostBinding, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Plex } from '@andes/plex';

import { Adjunto } from 'src/app/models/Adjunto';

import { AdjuntoService } from 'src/app/services/adjunto.service';
import { AdjuntosFormComponent } from './adjuntos-form.component';
import { FileManagerComponent } from 'src/app/components/file-manager/file.manager.component';


@Component({
    selector: 'app-adjuntos-create-update',
    templateUrl: './adjuntos-create-update.html'
  })
export class AdjuntosCreateUpdateComponent {
    @Input() object: any;
    @Input() item: Adjunto = new Adjunto();
    @Input() editable: Boolean = true;
    @Input() titulo: String = "Agente";
    @Input() 
    get subtitulo(){
        let value = ""
        if(this.item){
            value = (this.item._id)? 'Editar Adjunto':'Nuevo Adjunto';
        }
        return value;
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    @Output() error: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(AdjuntosFormComponent) adjuntoFormComponent: AdjuntosFormComponent;
    @ViewChild(FileManagerComponent) fileManager: FileManagerComponent;

     
    @HostBinding('class.plex-layout') layout = true;
    
    constructor(
        private adjuntoService:AdjuntoService,
        public plex: Plex
        ){}

    guardar(){
        if (this.adjuntoFormComponent.invalid()) {
            this.plex.info('danger', 'Debe completar todos los datos obligatorios');
        }
        else{
            let datosAdjunto = this.adjuntoFormComponent.form.value;
            if (datosAdjunto._id){
                this.updateAdjunto(datosAdjunto);
            }
            else{
                this.addAdjunto(datosAdjunto);
            }
        }        
    }

    addAdjunto(adjunto:any){
        this.adjuntoService.post(adjunto)
            .subscribe( adjunto => {
                // Try to save files
                this.fileManager.saveFileChanges(adjunto);
                this.adjuntoFormComponent.resetForms();
                this.success.emit(adjunto);
        }, errors => this.error.emit(errors))
    }

    updateAdjunto(adjunto:any){
        this.adjuntoService.put(adjunto)
            .subscribe( adjunto => {
                // Try to save files
                this.fileManager.saveFileChanges(adjunto);
                this.adjuntoFormComponent.resetForms();
                this.success.emit(adjunto);
        }, errors => this.error.emit(errors))
    }

    public cancelar(){
        this.adjuntoFormComponent.resetForms();
        this.cancel.emit();
    }

}