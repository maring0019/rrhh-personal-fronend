import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { Parte } from '../models/Parte';
import { ParteAgente } from '../models/ParteAgente';

@Injectable()
export class ParteService { 
    private url = '/modules/partes/partes'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<Parte[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    getByID(objectId?: any): Observable<Parte> {
        let url = `${this.url}/${objectId}`;
        return this.server.get(url);
    }

    getPartesAgentes(objectId: any): Observable<ParteAgente[]> {
        let url = `${this.url}/${objectId}/partesagentes`;
        return this.server.get(url);
    }

    putPartesAgentes(objectId: any, objects: ParteAgente[]): Observable<Parte> {
        let url = `${this.url}/${objectId}/partesagentes`;
        return this.server.put(url, objects);
    }

    post(object: Parte): Observable<Parte> {
        return this.server.post(this.url, object);
    }

    procesar(object: Parte): Observable<Parte> {
        const url = `${this.url}/${object.id}/procesar`;
        return this.server.post(url, object);
    }

    guardar(object:Parte, partesAgentes: ParteAgente[]): Observable<ParteAgente[]> {
        const url = `${this.url}/${object.id}/guardar`;
        return this.server.patch(url, partesAgentes);
    }

    confirmar(object:Parte, partesAgentes: ParteAgente[]): Observable<ParteAgente[]> {
        const url = `${this.url}/${object.id}/procesar`;
        return this.server.patch(url, partesAgentes);
    }

    put(object: Parte): Observable<Parte> {
        const url = `${this.url}/${object.id}`;
        return this.server.put(url, object);
    }

}