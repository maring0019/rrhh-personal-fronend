import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { Observable } from 'rxjs/Observable';
import { UbicacionServicio } from '../models/UbicacionServicio';

@Injectable()
export class UbicacionService {

    private baseUrl = '/core/organigrama/ubicaciones';

    constructor(private server: Server) { }

    get(params: any): Observable<UbicacionServicio[]> {
        return this.server.get(this.baseUrl + '/mock', { params: params, showError: true });
    }

    getByUserID(userID): Observable<UbicacionServicio[]> {
        return this.server.get(this.baseUrl + '/usuario/' + userID,);
    }
}
