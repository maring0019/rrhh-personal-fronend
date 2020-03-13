import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { ParteAgente } from '../models/ParteAgente';
import { GenericService } from './generic.service';


@Injectable()
export class ParteAgenteService extends GenericService<ParteAgente> {
    constructor(protected server: Server) { 
        super(server, '/modules/partes/partesagentes')
    }

    postMany(objects: ParteAgente[]): Observable<ParteAgente[]> {
        return this.server.post(`${this.url}/batch-insert`, objects);
    }
}