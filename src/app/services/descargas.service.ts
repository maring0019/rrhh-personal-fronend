import { Injectable } from '@angular/core';
import { Http, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Server } from '@andes/shared';
import { environment } from 'src/environments/environment';

@Injectable()
export class DescargasService {

    private serverUrl= environment.API;
    private baseUrl = '/core/descargas'; // URL to web api
    
    constructor(private server: Server, private http: Http) { }

    download(ausentismoId: any): Observable<any> { 
        const url = `${this.serverUrl}${this.baseUrl}/ausentismo/${ausentismoId}/comprobantes/certificado/download`;
        const options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get(url, options)
            .map(res => {
                return {
                    filename: 'constanciaCertificado.pdf',
                    file: res.blob()
                };
            })
            .catch(this.handleError)
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }
}