import { Observable } from 'rxjs/Observable';
import { Localidad } from './../models/Localidad';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';


@Injectable()
export class LocalidadService {

    private localidadUrl = '/core/tm/localidades';  // URL to web api

    constructor(private server: Server) { }

    get(params?: any): Observable<Localidad[]> {
        return this.server.get(this.localidadUrl, { params: params, showError: true });
    }

    getXProvincia(provincia: String): Observable<Localidad[]> {
        return this.server.get(this.localidadUrl + '?provincia=' + provincia);
    }
}
