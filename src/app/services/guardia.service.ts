import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { Guardia } from 'src/app/models/Guardia';


@Injectable()
export class GuardiaService {
    private url = '/modules/guardias/guardias'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<Guardia[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    getByID(objectId?: any): Observable<Guardia> {
        let url = `${this.url}/${objectId}`;
        return this.server.get(url);
    }

    post(object: Guardia): Observable<Guardia> {
        return this.server.post(this.url, object);
    }

    put(object: Guardia): Observable<Guardia> {
        const url = `${this.url}/${object.id}`;
        return this.server.put(url, object);
    }

}