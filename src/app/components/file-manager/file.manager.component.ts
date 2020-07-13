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
    @Input() autoSave:Boolean = false;  // Flag para indicar si los cambios impactan directamente sobre el obj propietario
    @Input() filesAttached = [];        // Archivos previos almacenados. Mantiene unicamente info sobre los archivos uploaded
    @Input() maxFiles:Number;
    @Input() size: 'lg' | 'sm'  = 'lg';
    @Input() title:String = 'Archivos adjuntos';
    @Input() subtitle:String = '';
    @Input() editable:Boolean = true;

    @Output() filesChanged:EventEmitter<any> = new EventEmitter<any>(); // Notifica 

    @ViewChild('dynamicUploaderStatus', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
    componentRef:any;

    filesToAttach = [];
    filesToDettach = [];

    get files(){
        let newFiles = this.filesAttached.concat(this.filesToAttach);
        return newFiles;
    }

    constructor(
        private filesService: FilesService,
        public plex: Plex,
        private resolver: ComponentFactoryResolver){}

    public ngOnInit() {
        this.loadExistingFiles();
    }

    private loadExistingFiles(){
        if (this.filesOwner && this.filesOwner._id){
            this.filesService.getObjectFiles(this.filesOwner._id)
                .subscribe(data => {
                    this.filesAttached = data;
            });
        }
    }

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
                if (fileUploaded) this.addFileToAttach(fileUploaded);
                componentRef.destroy();
            }); 
        componentRef.instance.cancelUpload
            .subscribe(e => {
                componentRef.destroy();
            });
    }

    public removeFile(index){
        if (this.autoSave){
            // TODO Implementar dettach de un archivo individual
            // this.plex.info('info', 'Desea quitar el archivo adjunto?')
            // .then( e => {
            //     if (true){
            //         this.deleteFile(index);
            //     }
            // });
        }
        else{
            const file = this.files[index];
            if (file.metadata && file.metadata.objID){
                this.removeFileAttached(file);
            }
            else{
                this.removeFileUploaded(file);
            }
        }
    }

    /**
     * Agrega un archivo al listado de archivos que se asociaran
     * posteriormente a un objeto. 
     * @param fileUploaded 
     */
    addFileToAttach(fileUploaded){
        this.filesToAttach.push(fileUploaded);
        this.filesChanged.emit();
    }

    /**
     * Remueve el archivo indicado del listado de archivos que ya han
     * sido asociados a un objeto. No realiza un borrado fisico
     * @param file 
     */
    removeFileAttached(file){
        const index = this.filesAttached.indexOf(file);
        this.filesAttached.splice(index, 1);
        this.filesToDettach.push(file);
        this.filesChanged.emit();
    }

    /**
     * Remueve visualmente el archivo indicado del listado de archivos
     * uploaded, y a su vez realiza un borrado fisico del mismo. 
     * @param file 
     */
    removeFileUploaded(file){
        const index = this.filesToAttach.indexOf(file);
        this.filesToAttach.splice(index, 1);
        this.filesService.delete(file._id).subscribe();
        this.filesChanged.emit();
    }

    /**
     * La visualizacion de un adjunto se dispara desde el template html
     * @param index 
     */
    public viewFile(index){
    
    }

    
    public saveFileChanges(obj?){
        this.attachFilesToObj(obj);
        this.dettachFilesFromObj(obj);
    }

    /**
     * Reinicia el componente a los valores iniciales.Es decir sin
     * elementos para adjuntar o quitar.
     */
    public reset(){
        this.filesToAttach = [];
        this.filesToDettach = [];
    }
   
    
    /**
     * Asocia los archivos uploaded a un objeto que sera el propietario
     * de los mismos.
     * @param file 
     */
    private attachFilesToObj(obj?){
        if (this.filesToAttach.length){
            let filesIDs = this.filesToAttach.map(f=>f._id);
            let objID = obj? obj._id : this.filesOwner._id;
            return this.filesService.attachFiles(objID, filesIDs).subscribe();
        }
    }

    /**
     * Realiza un borrado fisico de los archivos seleccionados para 
     * esta accion
     * @param file 
     */
    private dettachFilesFromObj(obj?){
        if (this.filesToDettach.length){
            let filesIDs = this.filesToDettach.map(f=>f._id);
            let objID = obj? obj._id : this.filesOwner._id;
            return this.filesService.dettachFiles(objID, filesIDs).subscribe();
        }
    }


}