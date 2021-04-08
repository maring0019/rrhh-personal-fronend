import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { HoraExtra } from '../models/HoraExtra';
import { GenericService } from './generic.service';

@Injectable()
export class HoraExtraService extends GenericService<HoraExtra> {
    constructor(protected server: Server) { 
        super(server, '/modules/horasextras/horasextras')
    }

    putAndConfirmar(object: HoraExtra): Observable<HoraExtra> {
        const url = `${this.url}/${object._id}/confirmar`;
        return this.server.put(url, object);
    }

    putAndProcesar(object: HoraExtra): Observable<HoraExtra> {
        const url = `${this.url}/${object._id}/procesar`;
        return this.server.put(url, object);
    }

    putAndHabilitarEdicion(object: HoraExtra): Observable<HoraExtra> {
        const url = `${this.url}/${object._id}/habilitar-edicion`;
        return this.server.put(url, object);
    }

    postAndConfirmar(object: HoraExtra): Observable<HoraExtra> {
        let url = `${this.url}/confirmar`;
        return this.server.post(url, object);
    }

}