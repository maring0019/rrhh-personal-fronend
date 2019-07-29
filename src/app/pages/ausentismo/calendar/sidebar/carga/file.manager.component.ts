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
    @Input() filesOwner:any;            // Objeto propietario de los archivos.
    @Input() autoSave:Boolean = false; // Flag para indicar si los cambios impactan directamente sobre el obj propietario
    @Input() filesAttached = [];        // Almacena unicamente info sobre los archivos uploaded
    @Input() maxFiles;
    @Input() title = 'Archivos adjuntos';

    @Output() filesChanged:EventEmitter<any> = new EventEmitter<any>(); // Notifica 

    @ViewChild('dynamicUploaderStatus', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
    componentRef:any;

   filesToAttach = [];
   filesToDettach = [];

    get files(){
        let newFiles = this.filesAttached.concat(this.filesToAttach);
        // console.log(newFiles);
        return newFiles;
    }

    constructor(
        private filesService: FilesService,
        public plex: Plex,
        private resolver: ComponentFactoryResolver){}

    public ngOnInit() {}

    public onClickToUpload(files){
        if (files.length === 0) return;
        if (this.maxFiles && this.files.length === this.maxFiles){
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
        componentRef.instance.attachFile = this.autoSave;
        componentRef.instance.objectRef = this.filesOwner;
        // Subscribe to child Output() events
        componentRef.instance.fileUploaded
            .subscribe(fileUploaded => {
                if (this.autoSave && this.filesOwner){
                    // TODO Implementar el attach inmediato    
                }
                this.filesToAttach.push(fileUploaded);
                this.filesChanged.emit(fileUploaded);
                componentRef.destroy();
            });
        componentRef.instance.cancelUpload
            .subscribe(e => {
                componentRef.destroy();
            });
    }

    public removeFile(index){
        if (this.autoSave){
            this.plex.info('info', 'Desea quitar el archivo adjunto?')
            .then( e => {
                if (true){
                    this.deleteFile(index);
                }
            });
        }
        else{
            this.deleteFile(index);
        }
    }

    deleteFile(index){
        const file = this.files[index];
        if (file.metadata && file.metadata.objID){
            this.deleteFileAttached(file);
        }
        else{
            this.deleteFileUploaded(file);
        }
    }

    deleteFileAttached(file){
        const index = this.filesAttached.indexOf(file);
        this.filesAttached.splice(index, 1);
        this.filesToDettach.push(file);
    }

    deleteFileUploaded(file){
        const index = this.filesToAttach.indexOf(file);
        this.filesToAttach.splice(index, 1);
        this.filesService.delete(file._id).subscribe();
    }

    public viewFile(index){
        document.getElementById(`downloader-${index}`).click();
    }

    
    public saveFileChanges(obj?){
        this.attachFilesToObj(obj);
        this.dettachFilesFromObj(obj);
    }

   
    private attachFilesToObj(obj?){
        if (this.filesToAttach.length){
            let filesIDs = this.filesToAttach.map(f=>f._id);
            let objID = obj? obj.id : this.filesOwner.id;
            return this.filesService.attachFiles(objID, filesIDs).subscribe();
        }
    }

    private dettachFilesFromObj(obj?){
        if (this.filesToDettach.length){
            let filesIDs = this.filesToDettach.map(f=>f._id);
            let objID = obj? obj.id : this.filesOwner.id;
            return this.filesService.dettachFiles(objID, filesIDs).subscribe();
        }
    }


}