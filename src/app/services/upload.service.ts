import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { IUploadResponse } from '../models/IUploadResponse';

import { environment } from 'src/environments/environment';
 
@Injectable()
export class UploadService {
    private baseURL = environment.API;
    private url = `${this.baseURL}/core/files`;
    
    constructor(private server: Server, private httpClient: HttpClient) { }

    public upload(data):Observable<IUploadResponse> {
        let uploadURL = `${this.url}/upload`;
    
        return this.httpClient.post<any>(uploadURL, data, {
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
                    response.downloadURL = this.getDownloadURL(response.id);
                    return event.body;
                default:
                    return {}
            }
        })
        );
    }

    private getDownloadURL(fileId){
        return  `${this.url}/${fileId}/download`;
    }

    download(fileId: any): Observable<any> {
        const url = `${this.url}/${fileId}/download`;
        return this.server.get(url);
    }

    delete(fileId: any): Observable<any> {
        const url = `${this.url}/${fileId}/delete`;
        return this.server.delete(url);
    }


}