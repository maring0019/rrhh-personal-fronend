import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { Observable } from 'rxjs/Observable';
import { UbicacionServicio } from '../models/UbicacionServicio';

@Injectable()
export class UbicacionService {

    private baseUrl = '/core/organigrama/ubicaciones';

    constructor(private server: Server) { }

    get(params: any): Observable<UbicacionServicio[]> {
        return this.server.get(this.baseUrl + '/mock/ubicaciones', { params: params, showError: true });
    }

    getByCodigo(codigo: any): Observable<UbicacionServicio> {
        let url = `${this.baseUrl}/codigo/${codigo}`;
        return this.server.get(url);
    }

    getByUserID(userID): Observable<UbicacionServicio[]> {
        return this.server.get(this.baseUrl + '/usuario/' + userID,);
    }
}
