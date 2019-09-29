import { Injectable } from '@angular/core';
import { Http, ResponseContentType, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Server } from '@andes/shared';
import { environment } from 'src/environments/environment';

export interface Options {
    params?: any;
    showError?: boolean;
    showLoader?: boolean;
}

@Injectable()
export class ReportesService {

    private serverUrl= environment.API;
    private baseUrl = '/modules/reportes'; // URL to web api
    
    constructor(private server: Server, private http: Http) { }

    download(params?: any): Observable<any> { 
        const url = `${this.serverUrl}${this.baseUrl}/agentes/legajo/download`;
        let options = this.prepareOptions({ params: params, showError: true });
        options.responseType = ResponseContentType.Blob;
        // const options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get(url, options)
            .map(res => {
                return {
                    filename: 'legajoAgente.pdf',
                    file: res.blob()
                };
            })
            .catch(this.handleError)
    }

    show(params?: any): Observable<any> { 
        console.log(params)
        const url = `${this.serverUrl}${this.baseUrl}/agentes/legajo`;
        let options = this.prepareOptions({ params: params, showError: true });
        options.responseType = ResponseContentType.Text;
        // const options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get(url, options).catch(this.handleError);
            // .map(res => {
            //     return {
            //         filename: 'legajoAgente.pdf',
            //         file: res.blob()
            //     };
            // })
            // .catch(this.handleError)
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

    private prepareOptions(options: Options): RequestOptions {
        let result = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('jwt') ? 'JWT ' + window.sessionStorage.getItem('jwt') : null
            }),
        });
        if (options && options.params) {
            result.search = new URLSearchParams();
            for (let param in options.params) {
                if (options.params[param] !== undefined) {
                    if (Array.isArray(options.params[param])) {
                        (options.params[param] as Array<any>).forEach((value) => {
                            result.search.append(param, value);
                        });
                    } else {
                        if (options.params[param] instanceof Date) {
                            result.search.set(param, (options.params[param] as Date).toISOString());
                        } else {
                            result.search.set(param, options.params[param]);
                        }
                    }
                }
            }
        }
        return result;
    }
}