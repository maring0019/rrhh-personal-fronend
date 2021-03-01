import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { Recargo } from '../models/Recargo';
import { GenericService } from './generic.service';

@Injectable()
export class RecargoService extends GenericService<Recargo> {
    constructor(protected server: Server) { 
        super(server, '/modules/recargos/recargos')
    }

    putAndConfirmar(object: Recargo): Observable<Recargo> {
        const url = `${this.url}/${object._id}/confirmar`;
        return this.server.put(url, object);
    }

    putAndProcesar(object: Recargo): Observable<Recargo> {
        const url = `${this.url}/${object._id}/procesar`;
        return this.server.put(url, object);
    }

    putAndProcesarParcialmente(object: Recargo): Observable<Recargo> {
        const url = `${this.url}/${object._id}/procesar-parcialmente`;
        return this.server.put(url, object);
    }

    postAndConfirmar(object: Recargo): Observable<Recargo> {
        let url = `${this.url}/confirmar`;
        return this.server.post(url, object);
    }
}