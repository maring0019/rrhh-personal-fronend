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

    postAndConfirmar(object: Guardia): Observable<Guardia> {
        let url = `${this.url}/confirmar`;
        return this.server.post(url, object);
    }

    put(object: Guardia): Observable<Guardia> {
        const url = `${this.url}/${object._id}`;
        return this.server.put(url, object);
    }

    putAndConfirmar(object: Guardia): Observable<Guardia> {
        const url = `${this.url}/${object._id}/confirmar`;
        return this.server.put(url, object);
    }

    putAndProcesar(object: Guardia): Observable<Guardia> {
        const url = `${this.url}/${object._id}/procesar`;
        return this.server.put(url, object);
    }

    generarCsv(object: Guardia): Observable<Guardia> {
        const url = `${this.url}/${object._id}/generar-csv`;
        return this.server.get(url);
    }

}