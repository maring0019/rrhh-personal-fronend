import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';

import { TipoSituacion } from '../../models/TipoSituacion';

@Injectable()
export class TipoSituacionService {
    private url = '/core/tm/tiposituaciones'; // URL to web api
    constructor(private server: Server) { }

    search(params?: any): Observable<TipoSituacion[]> {
        const url = `${this.url}/search`; 
        return this.server.get(url, { params: params, showError: true });
    }


    get(params?: any): Observable<TipoSituacion[]> {
        return this.server.get(this.url, { params: params, showError: true });
    } 

    getByID(objectId?: any): Observable<TipoSituacion> {
        const url = `${this.url}/${objectId}`;
        return this.server.get(url);
    }

    post(situacion: TipoSituacion): Observable<TipoSituacion> {
        return this.server.post(this.url, situacion);
    }

    put(situacion: TipoSituacion): Observable<TipoSituacion> {
        return this.server.put(this.url + '/' + situacion._id, situacion);
    }

    delete(objectId: any): Observable<TipoSituacion> {
        const url = `${this.url}/${objectId}`;
        return this.server.delete(url);
    }

}