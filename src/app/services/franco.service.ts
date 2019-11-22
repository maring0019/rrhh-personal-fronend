import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { Franco } from '../models/Franco';

@Injectable()
export class FrancoService {
    private baseUrl = '/modules/ausentismo/francos'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<Franco[]> {
        return this.server.get(this.baseUrl, { params: params, showError: true });
    }

    getAsEventos(params?: any): Observable<any[]> {
        const url = `${this.baseUrl}/eventos`;
        return this.server.get(url, { params: params, showError: true });
    }

    post(object: Franco): Observable<Franco> {
        return this.server.post(this.baseUrl, object);
    }

    put(object: Franco): Observable<Franco> {
        const url = `${this.baseUrl}/${object.id}`;
        return this.server.put(url, object);
    }


    /**
     * Inserta un conjunto de francos
     * @param objects 
     */
    addFrancos(objects: Franco[]): Observable<Franco[]> {
        const url = `${this.baseUrl}/addMany`;
        return this.server.post(url, objects);
    }

    /**
     * Elimina un conjunto de francos identificados por su Id
     * @param ids listado de id de francos a eliminar
     */
    deleteFrancos(ids: String[]): Observable<any> {
        const url = `${this.baseUrl}/deleteMany`;
        return this.server.post(url, ids);
    }

}