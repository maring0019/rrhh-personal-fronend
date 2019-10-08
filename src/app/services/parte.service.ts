import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { Parte } from '../models/Parte';

@Injectable()
export class ParteService {
    private url = '/modules/partes/partes'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<Parte[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    getByID(objectId?: any): Observable<Parte> {
        let url = `${this.url}/${objectId}`;
        return this.server.get(url);
    }

    post(object: Parte): Observable<Parte> {
        return this.server.post(this.url, object);
    }

    put(object: Parte): Observable<Parte> {
        const url = `${this.url}/${object.id}`;
        return this.server.put(url, object);
    }

}