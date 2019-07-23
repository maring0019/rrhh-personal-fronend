import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { Articulo } from '../models/Articulo';

@Injectable()
export class ArticuloService {
    private url = 'http://mongolito.hospitalneuquen.org.ar:3004/api/modules/ausentismo/articulos'; // URL to web api
    
    constructor(private server: Server) { }

    get(params?: any): Observable<Articulo[]> {
        return this.server.get(this.url, { params: params, showError: true });
    }

    post(object: Articulo): Observable<Articulo> {
        return this.server.post(this.url, object);
    }

    put(object: Articulo): Observable<Articulo> {
        const url = `${this.url}/${object.id}`;
        return this.server.put(url, object);
    }

}