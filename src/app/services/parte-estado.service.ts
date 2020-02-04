import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { ParteEstado } from '../models/ParteEstado';

@Injectable()
export class ParteEstadoService {
    private url = '/modules/partes/parteestados'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<ParteEstado[]> {

        return this.server.get(this.url, { params: params, showError: true, showLoader: false });
    }

    getByID(objectId?: any): Observable<ParteEstado> {
        let url = `${this.url}/${objectId}`;
        return this.server.get(url);
    }

    post(object: ParteEstado): Observable<ParteEstado> {
        return this.server.post(this.url, object);
    }

    put(object: ParteEstado): Observable<ParteEstado> {
        const url = `${this.url}/${object._id}`;
        return this.server.put(url, object);
    }

}