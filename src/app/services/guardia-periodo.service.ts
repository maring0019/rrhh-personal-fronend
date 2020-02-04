import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { GuardiaPeriodo } from 'src/app/models/GuardiaPeriodos';


@Injectable()
export class GuardiaPeriodoService {
    private url = '/modules/guardias/guardiaperiodos'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<GuardiaPeriodo[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    getByID(objectId?: any): Observable<GuardiaPeriodo> {
        let url = `${this.url}/${objectId}`;
        return this.server.get(url);
    }

    post(object: GuardiaPeriodo): Observable<GuardiaPeriodo> {
        return this.server.post(this.url, object);
    }

    put(object: GuardiaPeriodo): Observable<GuardiaPeriodo> {
        const url = `${this.url}/${object._id}`;
        return this.server.put(url, object);
    }

}