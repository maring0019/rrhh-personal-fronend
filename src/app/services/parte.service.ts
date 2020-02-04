import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';

import { Parte } from 'src/app/models/Parte';
import { ParteAgente } from 'src/app/models/ParteAgente';
import { Fichada } from 'src/app/models/Fichada';


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

    getPartesAgenteReporte(params: any): Observable<ParteAgente[]> {
        let url = `${this.url}/reportes/agentes`;
        return this.server.get(url, { params: params, showError: true });
    }

    getFichadasAgentesReporte(params: any): Observable<Fichada[]> {
        let url = `${this.url}/reportes/fichadas`;
        return this.server.get(url, { params: params, showError: true });
    }

    putPartesAgentes(objectId: any, objects: ParteAgente[]): Observable<Parte> {
        let url = `${this.url}/${objectId}/partesagentes`;
        return this.server.put(url, objects);
    }

    post(object: Parte): Observable<Parte> {
        return this.server.post(this.url, object);
    }

    procesar(object: Parte): Observable<Parte> {
        const url = `${this.url}/${object._id}/procesar`;
        return this.server.post(url, object);
    }

    guardar(object:Parte, partesAgentes: ParteAgente[]): Observable<ParteAgente[]> {
        const url = `${this.url}/${object._id}/guardar`;
        return this.server.post(url, partesAgentes);
    }

    confirmar(object:Parte, partesAgentes: ParteAgente[]): Observable<ParteAgente[]> {
        const url = `${this.url}/${object._id}/confirmar`;
        return this.server.post(url, partesAgentes);
    }

    editar(object:Parte, partesAgentes: ParteAgente[]): Observable<ParteAgente[]> {
        const url = `${this.url}/${object._id}/editar`;
        return this.server.post(url, partesAgentes);
    }

    put(object: Parte): Observable<Parte> {
        const url = `${this.url}/${object._id}`;
        return this.server.put(url, object);
    }

}