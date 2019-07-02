import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Server } from '@andes/shared';
import { Ausencia } from '../models/Ausencia';
import { AusenciaPeriodo } from '../models/AusenciaPeriodo';

@Injectable()
export class AusentismoService {
    private url = '/modules/ausentismo/ausencias'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<Ausencia[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    post(object: Ausencia): Observable<Ausencia> {
        return this.server.post(this.url, object);
    }

    put(object: Ausencia): Observable<Ausencia> {
        return this.server.put(this.url + '/' + object.id, object);
    }

    postAusenciasPeriodo(object: AusenciaPeriodo): Observable<any> {
        const url = `${this.url}/periodo`;
        return this.server.post(url, object).pipe(
            map(data =>
                data.ausencias.map(e=> e = {
                    'title': e.articulo.codigo,
                    'start': e.fecha,
                    'allDay': true
                  })
            )
        );;
    }

    searchAusenciasPeriodo(params?: any): Observable<AusenciaPeriodo[]> {
        const url = `${this.url}/periodo`;
        return this.server.get(url, { params: params, showError: true });
    }


}