import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { SubPuesto } from '../models/Subpuesto';

@Injectable()
export class SubPuestoService {
    private url = '/core/organigrama/subpuestos'; // URL to web api
    constructor(private server: Server) { }

    get(params?: any): Observable<SubPuesto[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    post(object: SubPuesto): Observable<SubPuesto> {
        return this.server.post(this.url, object);
    }

    put(object: SubPuesto): Observable<SubPuesto> {
        return this.server.put(this.url + '/' + object._id, object);
    }

}