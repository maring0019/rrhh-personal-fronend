import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Agente } from '../hardcodeo/agente';
import { AGENTES } from './hardcode-agentes';



import { Server } from '@andes/shared';


@Injectable()
export class AgenteMockService {
    private agenteUrl = '/modules/agentes/agentes'; // URL to web api
    constructor(private server: Server) { }

    get(params?: any): Observable<Agente[]> {
        return of(AGENTES) ;
    }

    // TODO: Revisar el tema de los parametros
    getFoto(params: any): Observable<any> {
        return this.server.get(this.agenteUrl + '/fotos/' + params);
    }

    // TODO: Revisar el tema de los parametros
    getByID(id?: any): Observable<Agente> {
      return (of(AGENTES)).pipe(
        map((agentes: Agente[]) => agentes.find(agente => agente.id === +id))
      );
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