import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';

import { Educacion } from '../models/Educacion';

@Injectable()
export class EducacionService {
    private educacionUrl = '/core/tm/educacion'; // URL to web api
    constructor(private server: Server) { }

    get(params?: any): Observable<Educacion[]> {
        return this.server.get(this.educacionUrl, { params: params, showError: true });
    }

    post(educacion: Educacion): Observable<Educacion> {
        return this.server.post(this.educacionUrl, educacion);
    }

    put(educacion: Educacion): Observable<Educacion> {
        return this.server.put(this.educacionUrl + '/' + educacion.id, educacion);
    }

}