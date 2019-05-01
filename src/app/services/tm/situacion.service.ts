import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';

import { Situacion } from '../../models/Situacion';

@Injectable()
export class SituacionService {
    private situacionUrl = '/core/tm/situaciones'; // URL to web api
    constructor(private server: Server) { }

    get(params?: any): Observable<Situacion[]> {
        return this.server.get(this.situacionUrl, { params: params, showError: true });
    }

    post(situacion: Situacion): Observable<Situacion> {
        return this.server.post(this.situacionUrl, situacion);
    }

    put(situacion: Situacion): Observable<Situacion> {
        return this.server.put(this.situacionUrl + '/' + situacion.id, situacion);
    }

}