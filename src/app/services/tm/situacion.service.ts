import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';

import { TipoSituacion } from '../../models/TipoSituacion';

@Injectable()
export class TipoSituacionService {
    private situacionUrl = '/core/tm/tiposituaciones'; // URL to web api
    constructor(private server: Server) { }

    search(params?: any): Observable<TipoSituacion[]> {
        const url = `${this.situacionUrl}/search`; 
        return this.server.get(url, { params: params, showError: true });
    }


    get(params?: any): Observable<TipoSituacion[]> {
        return this.server.get(this.situacionUrl, { params: params, showError: true });
    } 

    getByID(objectId?: any): Observable<TipoSituacion> {
        const url = `${this.situacionUrl}/${objectId}`;
        return this.server.get(url);
    }

    post(situacion: TipoSituacion): Observable<TipoSituacion> {
        return this.server.post(this.situacionUrl, situacion);
    }

    put(situacion: TipoSituacion): Observable<TipoSituacion> {
        return this.server.put(this.situacionUrl + '/' + situacion.id, situacion);
    }

}