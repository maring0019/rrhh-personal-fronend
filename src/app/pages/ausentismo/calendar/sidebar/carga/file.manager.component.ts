import { Component, OnInit, Input, EventEmitter, Output, ViewChild,
    ViewContainerRef, ComponentFactoryResolver} from '@angular/core';

import { Plex } from '@andes/plex';

import { FilesService } from 'src/app/services/files.service';
import { UploaderStatusComponent } from './uploader.status.component';

@Component({
    selector: 'app-file-manager',
    templateUrl: 'file.manager.html'
})
export class FileManagerComponent implements OnInit {
    @Input() filesOwner:any;          // Objeto propietario de los archivos.
    @Input() autosave:Boolean = true; // Flag para indicar si los cambios impactan directamente sobre el obj propietario
    @Input() filesUploaded = [];      // Almacena unicamente info sobre los archivos uploaded
    @Input() maxFiles;
    @Input() title = 'Archivos adjuntos';

    @Output() filesChanged:EventEmitter<any> = new EventEmitter<any>(); // Notifica 

    @ViewChild('dynamicUploaderStatus', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
    componentRef:any;

    constructor(
        private filesService: FilesService,
        public plex: Plex,
        private resolver: ComponentFactoryResolver){}

    public ngOnInit() {}

    public onClickToUpload(files){
        if (files.length === 0) return;
        if (this.maxFiles && this.filesUploaded.length === this.maxFiles){
            this.plex.info('info', 'No se pueden adjuntar mas archivos. El numero maximo de arhivos es ' + this.maxFiles);
        }
        else{
            this.createDynamicUploaderComponent(files[0]);
        }
    }

    /**
     * Crea dinamicamente un componente para llevar registro del proceso de
     * upload de un archivo. Cuando el componente creado finaliza el upload
     * (exitosamente o con error), notifica este evento hacia el exterior y
     * luego este componente creado dinamicamente se elimina.
     * 
     * @param file fileToUpload
     */
    createDynamicUploaderComponent(file) {
        const factory = this.resolver.resolveComponentFactory(UploaderStatusComponent);
        let componentRef = this.viewContainerRef.createComponent(factory);
        // Pass to child Input() parameters value
        componentRef.instance.fileToUpload = file;
        componentRef.instance.attachFile = this.autosave;
        componentRef.instance.objectRef = this.filesOwner;
        // Subscribe to child Output() events
        componentRef.instance.fileUploaded
            .subscribe(fileInfo => {
                    this.addFile(fileInfo);
                    componentRef.destroy();
            });
        componentRef.instance.cancelUpload
            .subscribe(e => {
                componentRef.destroy();
            });
    }

    addFile(newFiles){
        newFiles.forEach(file => {
            this.filesUploaded.push(file);
        });
        this.filesChanged.emit(this.filesUploaded);
    }

    public removeFile(index){
        this.plex.info('info', 'Desea quitar el archivo adjunto?')
            .then( e => {
                console.log(e);
                if (true){
                    this.deleteFile(index);
                }
        });
    }

    deleteFile(index){
        const fileInfo = this.filesUploaded[index];
        if (fileInfo.metadata && fileInfo.metadata.objID){
            // TODO: Eliminar archivo de la db
            console.log('Corresponde eliminar');
            this.filesService.dettachFiles(fileInfo.metadata.objID, [fileInfo.id]).subscribe();
        }
        else{
            this.filesService.delete(fileInfo.id).subscribe();
        }
        this.filesUploaded.splice(index, 1);
        this.filesChanged.emit(this.filesUploaded);
    }

    public viewFile(index){
        document.getElementById(`downloader-${index}`).click();
    }

}