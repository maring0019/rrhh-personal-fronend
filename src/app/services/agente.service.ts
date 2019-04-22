import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';

import { Agente } from '../models/Agente';

@Injectable()
export class AgenteService {
    private agenteUrl = '/modules/agentes/agentes'; // URL to web api
    constructor(private server: Server) { }

    get(params?: any): Observable<Agente[]> {
        return this.server.get(this.agenteUrl, { params: params, showError: true });
    }

    // TODO: Review this
    getByID(params?: any): Observable<Agente> {
        return this.server.get(this.agenteUrl + '/' + params);
    }

    post(agente: Agente): Observable<Agente> {
        return this.server.post(this.agenteUrl, agente);
    }

    search(params?: any): Observable<Agente[]> {
        return this.server.get(this.agenteUrl + '/search', { params: params, showError: true });
    }

    // put(agente: Agente): Observable<Agente> {
    //     return this.server.put(this.agenteUrl + '/' + agente.id, agente);
    // }

}