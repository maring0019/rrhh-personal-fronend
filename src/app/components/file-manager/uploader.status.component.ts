import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { FilesService } from 'src/app/services/files.service';

@Component({
    selector: 'app-uploader-status',
    templateUrl: 'uploader.status.html'
})
export class UploaderStatusComponent implements OnInit {
    @Input() fileToUpload:any;
    @Input() attachFile:Boolean = true; // Flag para indicar si los cambios impactan directamente sobre un objeto
    @Input() objectRef:any;             // Objeto propietario de los archivos.
    @Input() index:Number;
    
    @Output() fileUploaded: EventEmitter<any> = new EventEmitter<any>();
    @Output() cancelUpload: EventEmitter<any> = new EventEmitter<any>();

    fileUploadingInfo: any;

    constructor(private filesService: FilesService){}

    public ngOnInit() {
        if (this.fileToUpload){
            this.saveFile(this.fileToUpload);
        }
    }

    saveFile(file:File) {
        let formData = new FormData();
        formData.append('archivo', file);
        this.fileUploadingInfo = {filename: file.name }
        this.filesService.upload(formData)
            .subscribe((res) => {
                if (res.status){
                    this.fileUploadingInfo.status = res.status;
                    this.fileUploadingInfo.progress = res.progress;
                    if (res.status === 'uploaded'){
                        this.notifySuccess(res);
                    }
                }
            },
            (err) => {
                this.notifyError();
            }
        );
    }

    onCancelUpload(){
        this.cancelUpload.emit();
    }


    attachFileToObj(fileToAttach){
        this.filesService.attachFiles(this.objectRef._id, [fileToAttach._id])
        .subscribe( files => {
            this.notifySuccess(files);
        },
        (err) => {
            this.notifyError();
        }
        );
    }

    notifyError(){
        this.fileUploadingInfo.error = true;
        setTimeout(()=> this.fileUploaded.emit(), 2500); // Notify after 2.5 seg
    }

    notifySuccess(res){
        setTimeout(()=> this.fileUploaded.emit(res), 1000); // Notify after 1 seg
    }
}