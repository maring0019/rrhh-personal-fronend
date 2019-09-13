import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { Server } from '@andes/shared';

import { Agente } from '../models/Agente';
import { BajaAgente } from '../models/BajaAgente';

@Injectable()
export class AgenteService {
    private agenteUrl = '/modules/agentes/agentes'; // URL to web api
    constructor(private server: Server) { }

    get(params?: any): Observable<Agente[]> {
        return this.server.get(this.agenteUrl, { params: params, showError: true });
    }

    getByID(agenteId?: any): Observable<Agente> {
        const url = `${this.agenteUrl}/${agenteId}`;
        return this.server.get(url);
    }

    search(params?: any): Observable<Agente[]> {
        const url = `${this.agenteUrl}/search`;
        return this.server.get(url, { params: params, showError: true });
    }

    post(agente: Agente): Observable<Agente> {
        const url = `${this.agenteUrl}`;
        return this.server.post(url, agente);
    }


    put(agente: Agente): Observable<Agente> {
        const url = `${this.agenteUrl}/${agente.id}`;
        return this.server.put(url, agente);
    }

    baja(agente: Agente, baja:BajaAgente): Observable<Agente> {
        const url = `${this.agenteUrl}/${agente.id}/baja`;
        return this.server.put(url, baja);
    }

    reactivar(agente: Agente): Observable<Agente> {
        const url = `${this.agenteUrl}/${agente.id}/reactivar`;
        return this.server.put(url, {});
    }

    getFoto(agenteId: any): Observable<any> {
        const url = `${this.agenteUrl}/${agenteId}/fotos`;
        return this.server.get(url);
    }

    postFoto(agenteId, file) {
        const url = `${this.agenteUrl}/${agenteId}/fotos`;
        return this.server.post(url, { imagen:file});
    }

    getAusencias(agenteId):Observable<any[]> {
        const url = `${this.agenteUrl}/${agenteId}/ausencias`;
        return this.server.get(url);
    }

}