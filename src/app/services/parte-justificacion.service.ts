import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { ParteJustificacion } from '../models/ParteJustificacion';

@Injectable()
export class ParteJustificacionService {
    private url = '/modules/partes/partejustificaciones'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<ParteJustificacion[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    getByID(objectId?: any): Observable<ParteJustificacion> {
        let url = `${this.url}/${objectId}`;
        return this.server.get(url);
    }

    post(object: ParteJustificacion): Observable<ParteJustificacion> {
        return this.server.post(this.url, object);
    }

    put(object: ParteJustificacion): Observable<ParteJustificacion> {
        const url = `${this.url}/${object.id}`;
        return this.server.put(url, object);
    }

}