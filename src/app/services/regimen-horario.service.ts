import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { RegimenHorario } from '../models/RegimenHorario';

@Injectable()
export class RegimenHorarioService {
    private url = '/core/tm/regimenhorarios'; // URL to web api
    constructor(private server: Server) { }

    get(params?: any): Observable<RegimenHorario[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    post(object: RegimenHorario): Observable<RegimenHorario> {
        return this.server.post(this.url, object);
    }

    put(object: RegimenHorario): Observable<RegimenHorario> {
        return this.server.put(this.url + '/' + object._id, object);
    }

}