import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';

import { ISituacion } from '../../models/ISituacion';

@Injectable()
export class SituacionService {
    private situacionUrl = '/core/tm/situaciones'; // URL to web api
    constructor(private server: Server) { }

    get(params?: any): Observable<ISituacion[]> {
        return this.server.get(this.situacionUrl, { params: params, showError: true });
    }

    post(situacion: ISituacion): Observable<ISituacion> {
        return this.server.post(this.situacionUrl, situacion);
    }

    put(situacion: ISituacion): Observable<ISituacion> {
        return this.server.put(this.situacionUrl + '/' + situacion.id, situacion);
    }

}