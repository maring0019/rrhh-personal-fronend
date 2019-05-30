import { Provincia } from './../models/Provincia';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProvinciaService {

    private provinciaUrl = '/core/tm/provincias';  // URL to web api

    constructor(private server: Server) { }

    get(params: any): Observable<Provincia[]> {
        return this.server.get(this.provinciaUrl, { params: params, showError: true });
    }
}
