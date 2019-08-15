import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { Feriado } from '../models/Feriado';

@Injectable()
export class FeriadoService {
    private url = '/modules/ausentismo/feriados'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<Feriado[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    post(object: Feriado): Observable<Feriado> {
        return this.server.post(this.url, object);
    }

    put(object: Feriado): Observable<Feriado> {
        const url = `${this.url}/${object.id}`;
        return this.server.put(url, object);
    }

}