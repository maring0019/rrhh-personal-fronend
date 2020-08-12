import { Injectable } from '@angular/core';
import { Http, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Server } from '@andes/shared';
import { environment } from 'src/environments/environment';

@Injectable()
export class DescargasService {

    private serverUrl= environment.API;
    private baseUrl = '/core/descargas'; // URL to web api
    
    constructor(private server: Server, private http: Http,) { }

    credencialAgente(agenteID: any): Observable<any> { 
        const url = `${this.serverUrl}${this.baseUrl}/agentes/${agenteID}/credencial/download`;
        return this.download(url, 'credencialAgente.pdf');
    }

    constanciaCertificado(ausentismoId: any): Observable<any> { 
        const url = `${this.serverUrl}${this.baseUrl}/ausentismo/${ausentismoId}/comprobantes/certificado/download`;
        return this.download(url, 'constanciaCertificado.pdf');
    }


    download(url: string, filename: string): Observable<any> { 
        const options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get(url, options)
            .map(res => {
                return {
                    filename: filename,
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

    public descargarArchivo(data){
        // Estaria bueno quizas crear dinamicamente un componente
        // tipo dialogo inhabilitando cualquier otra accion hasta
        // que termine la descarga del documento/archivo
        // https://malcoded.com/posts/angular-dynamic-components/
        let url = window.URL.createObjectURL(data.file);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = data.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
    }
}