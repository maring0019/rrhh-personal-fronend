import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { UploadService } from 'src/app/services/upload.service';

@Component({
    selector: 'app-uploader-status',
    templateUrl: 'uploader.status.html'
})
export class UploaderStatusComponent implements OnInit {
    @Input() fileToUpload:any;
    @Input() index:Number;
    
    @Output() fileUploaded: EventEmitter<any> = new EventEmitter<any>();
    @Output() cancelUpload: EventEmitter<any> = new EventEmitter<any>();

    fileUploadingInfo: any;

    constructor(private uploadService: UploadService){}

    public ngOnInit() {
        if (this.fileToUpload){
            this.saveFile(this.fileToUpload);
        }
    }

    saveFile(file:File) {
        let formData = new FormData();
        formData.append('archivo', file);
        this.fileUploadingInfo = {filename: file.name }
        this.uploadService.upload(formData)
            .subscribe((res) => {
                if (res.status){
                    this.fileUploadingInfo.status = res.status;
                    this.fileUploadingInfo.progress = res.progress;
                    if (res.status === 'uploaded'){
                        setTimeout(()=> this.fileUploaded.emit(res), 1000); // Notify after 1 seg
                    }
                }
            },
            (err) => {
                this.fileUploadingInfo.error = true;
                setTimeout(()=> this.fileUploaded.emit(), 2500); // Notify after 2.5 seg
            }
        );
    }

    onCancelUpload(){
        this.cancelUpload.emit();
    }
}