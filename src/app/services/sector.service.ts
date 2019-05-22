import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { Sector } from '../models/Sector';

@Injectable()
export class SectorService {
    private url = '/core/organigrama/sectores'; // URL to web api
    constructor(private server: Server) { }

    get(params?: any): Observable<Sector[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    post(object: Sector): Observable<Sector> {
        return this.server.post(this.url, object);
    }

    put(object: Sector): Observable<Sector> {
        return this.server.put(this.url + '/' + object.id, object);
    }

}