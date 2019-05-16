import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { Observable } from 'rxjs/Observable';
import { Servicio } from '../models/Servicio';

@Injectable()
export class ServicioService {

    private baseUrl = '/core/organigrama/servicios';

    constructor(private server: Server) { }

    get(params: any): Observable<Servicio[]> {
        return this.server.get(this.baseUrl, { params: params, showError: true });
    }
}
