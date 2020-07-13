import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { IUploadResponse } from '../models/IUploadResponse';

import { environment } from 'src/environments/environment';
import { RequestOptions, Headers } from '@angular/http';
 
@Injectable()
export class FilesService {
    
    private serverUrl= environment.API;
    private baseUrl = '/core/files';
    
    constructor(private server: Server, private httpClient: HttpClient) { }

    public headerAuth = {
        'Authorization': window.sessionStorage.getItem('jwt') ? 'JWT ' + window.sessionStorage.getItem('jwt') : null
    };

    public upload(data):Observable<IUploadResponse> {
        let uploadURL = `${this.serverUrl}${this.baseUrl}/upload`;
        console.log(this.headerAuth)
        return this.httpClient.post<any>(uploadURL, data, {
            headers: this.headerAuth,
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {
            switch (event.type) {
                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', progress: progress };
                case HttpEventType.Response:
                    let response = event.body;
                    response.status = 'uploaded';
                    response.progress = 100;
                    response.downloadURL = this.getDownloadURL(response._id);
                    return event.body;
                default:
                    return {}
            }
        })
        );
    }

    private getDownloadURL(fileId){
        return  `${this.serverUrl}${this.baseUrl}/${fileId}/download`;
    }

    download(fileId: any): Observable<any> {
        const url = `${this.baseUrl}/${fileId}/download`;
        return this.server.get(url);
    }

    delete(fileId: any): Observable<any> {
        const url = `${this.baseUrl}/${fileId}/delete`;
        return this.server.delete(url);
    }

    getObjectFiles(objectId: any): Observable<any[]> {
        const url = `${this.baseUrl}/objects/${objectId}/files`;
        return this.server.get(url).pipe(
            map(files =>
                files.map(file => {
                    file.downloadURL = `${this.serverUrl}${this.baseUrl}/objects/${objectId}/files/${file._id}/download`;
                    return file;
                })
            )
        );
    }

    attachFiles(objectId: any, files?:any): Observable<any[]> {
        const url = `${this.baseUrl}/objects/${objectId}/attach`;
        return this.server.post(url, { filesToAttach: files});
    }

    dettachFiles(objectId: any, files:any): Observable<any> {
        const url = `${this.baseUrl}/objects/${objectId}/dettach`;
        return this.server.post(url, { filesToDettach: files});
    }


}