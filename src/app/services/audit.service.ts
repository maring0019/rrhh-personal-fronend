import { Injectable } from '@angular/core';
import { Http, ResponseContentType, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Server } from '@andes/shared';

import { GenericService } from './generic.service';
import { Audit } from '../models/Audit';
import { environment } from 'src/environments/environment';

export interface Options {
    params?: any;
    showError?: boolean;
    showLoader?: boolean;
}

@Injectable()
export class AuditService extends GenericService<Audit> {
    private serverUrl= environment.API;

    constructor(protected server: Server, private http: Http) { 
        super(server, '/modules/audits')
    }

    getHtmlDiff(objectId:string): Observable<any> { 
        let url = `${this.serverUrl}${this.url}/diff/${objectId}`
        let options = this.prepareOptions({showError: true });
        options.responseType = ResponseContentType.Text;
        return this.http.get(url, options).catch(this.handleError);
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