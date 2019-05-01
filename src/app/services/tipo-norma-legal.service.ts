import { TipoNormaLegal } from './../models/TipoNormaLegal';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TipoNormaLegalService {

    private baseUrl = '/core/tm/tiposnormalegal';

    constructor(private server: Server) { }

    get(params: any): Observable<TipoNormaLegal[]> {
        return this.server.get(this.baseUrl, { params: params, showError: true });
    }
}
