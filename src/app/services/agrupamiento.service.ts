import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { Agrupamiento } from '../models/Agrupamiento';

@Injectable()
export class AgrupamientoService {
    private url = '/core/organigrama/agrupamientos'; // URL to web api
    constructor(private server: Server) { }

    get(params?: any): Observable<Agrupamiento[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    post(object: Agrupamiento): Observable<Agrupamiento> {
        return this.server.post(this.url, object);
    }

    put(object: Agrupamiento): Observable<Agrupamiento> {
        return this.server.put(this.url + '/' + object.id, object);
    }

}