import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Server } from '@andes/shared';
import { Ausencia } from '../models/Ausencia';
import { Ausentismo } from '../models/Ausentismo';

@Injectable()
export class AusentismoService {
    private url = '/modules/ausentismo/ausencias'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<Ausencia[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    getByID(ausentismoId: any): Observable<Ausentismo> {
        const url = `${this.url}/periodo/${ausentismoId}`;
        return this.server.get(url);
    }

    post(object: Ausencia): Observable<Ausencia> {
        return this.server.post(this.url, object);
    }

    put(object: Ausencia): Observable<Ausencia> {
        return this.server.put(this.url + '/' + object.id, object);
    }

    postAusentismo(object: Ausentismo): Observable<any> {
        const url = `${this.url}/periodo`;
        return this.server.post(url, object);
        // .pipe(
        //     map(data =>
        //         data.ausencias.map(e=> e = {
        //             'title': e.articulo.codigo,
        //             'start': e.fecha,
        //             'allDay': true
        //           })
        //     )
        // );
    }

    postSugerirAusentismo(object: Ausentismo): Observable<any> {
        const url = `${this.url}/periodo/sugerir`;
        return this.server.post(url, object);
    }

    postCalcularAusentismo(object: Ausentismo): Observable<any> {
        const url = `${this.url}/periodo/calcular`;
        return this.server.post(url, object);
    }

    putAusentismo(object: Ausentismo): Observable<any> {
        const url = `${this.url}/periodo/${object.id}`;
        return this.server.put(url, object).pipe(
            map(data =>
                data.ausencias.map(e=> e = {
                    'title': e.articulo.codigo,
                    'start': e.fecha,
                    'allDay': true
                  })
            )
        );
    }

    searchAusentismo(params?: any): Observable<Ausentismo[]> {
        const url = `${this.url}/periodo`;
        return this.server.get(url, { params: params, showError: true });
    }


}