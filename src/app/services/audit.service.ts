import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';

import { GenericService } from './generic.service';
import { Audit } from '../models/Audit';


@Injectable()
export class AuditService extends GenericService<Audit> {
    constructor(protected server: Server) { 
        super(server, '/modules/audits')
    }

    // get(params?: any):Observable<T[]> {
    //     return this.server.get(this.url, { params: params, showError: true });
    // }

}