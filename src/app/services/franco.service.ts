import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { Franco } from '../models/Franco';

@Injectable()
export class FrancoService {
    private url = '/modules/ausentismo/francos'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<Franco[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    post(object: Franco): Observable<Franco> {
        return this.server.post(this.url, object);
    }

    put(object: Franco): Observable<Franco> {
        const url = `${this.url}/${object.id}`;
        return this.server.put(url, object);
    }


    /**
     * Inserta un conjunto de francos
     * @param objects 
     */
    addFrancos(objects: Franco[]): Observable<Franco[]> {
        const url = `${this.url}/addMany`;
        return this.server.post(url, objects);
    }

    /**
     * Elimina un conjunto de francos identificados por su Id
     * @param ids listado de id de francos a eliminar
     */
    deleteFrancos(ids: String[]): Observable<any> {
        const url = `${this.url}/deleteMany`;
        return this.server.post(url, ids);
    }

}