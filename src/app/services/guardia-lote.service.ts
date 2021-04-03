import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { GuardiaLote } from 'src/app/models/GuardiaLote';


@Injectable()
export class GuardiaLoteService {
    private url = '/modules/guardias/guardiaslotes'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<GuardiaLote[]> {
        return this.server.get(this.url, { params: params, showError: true })
            .pipe(
                map(res => {
                    // Forzamos que los datos retornado sean instancias de 
                    // GuardiaLote. Esto simplifica algunas acciones posteriores
                    let newRes = []
                    res.forEach(lote => newRes.push(new GuardiaLote(lote)));
                    return newRes;
                })
            );
    }

    getByID(objectId?: any): Observable<GuardiaLote> {
        let url = `${this.url}/${objectId}`;
        return this.server.get(url);
    }

    post(object: GuardiaLote): Observable<GuardiaLote> {
        return this.server.post(this.url, object);
    }

    put(object: GuardiaLote): Observable<GuardiaLote> {
        const url = `${this.url}/${object._id}`;
        return this.server.put(url, object);
    }

    delete(objectId: any): Observable<GuardiaLote> {
        const url = `${this.url}/${objectId}`;
        return this.server.delete(url);
    }

}