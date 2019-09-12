import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { CausaBaja } from 'src/app/models/CausaBaja';


@Injectable()
export class CausaBajaService {
    private baseUrl = '/core/tm/causabajas'; // URL to web api
    constructor(private server: Server) { }
    

    get(params?: any): Observable<CausaBaja[]> {
        return this.server.get(this.baseUrl, { params: params, showError: true });
    }

    post(situacion: CausaBaja): Observable<CausaBaja> {
        return this.server.post(this.baseUrl, situacion);
    }

    put(situacion: CausaBaja): Observable<CausaBaja> {
        return this.server.put(this.baseUrl + '/' + situacion.id, situacion);
    }

}