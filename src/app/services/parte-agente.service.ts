import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { ParteAgente } from '../models/ParteAgente';

@Injectable()
export class ParteAgenteService {
    private url = '/modules/partes/partesagentes'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<ParteAgente[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    getByID(objectId?: any): Observable<ParteAgente> {
        let url = `${this.url}/${objectId}`;
        return this.server.get(url);
    }

    post(object: ParteAgente): Observable<ParteAgente> {
        return this.server.post(this.url, object);
    }

    put(object: ParteAgente): Observable<ParteAgente> {
        const url = `${this.url}/${object.id}`;
        return this.server.put(url, object);
    } 

}