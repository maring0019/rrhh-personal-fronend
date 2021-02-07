import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';

import { GenericService } from './generic.service';
import { Adjunto } from '../models/Adjunto';


@Injectable()
export class AdjuntoService extends GenericService<Adjunto> {
    constructor(protected server: Server) { 
        super(server, '/modules/adjuntos/adjuntos')
    }
}