import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { Puesto } from '../models/Puesto';

@Injectable()
export class PuestoService {
    private url = '/core/organigrama/puestos'; // URL to web api
    constructor(private server: Server) { }

    get(params?: any): Observable<Puesto[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    post(object: Puesto): Observable<Puesto> {
        return this.server.post(this.url, object);
    }

    put(object: Puesto): Observable<Puesto> {
        return this.server.put(this.url + '/' + object._id, object);
    }

}