import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';

import { GenericService } from './generic.service';
import { Nota } from '../models/Nota';


@Injectable()
export class NotaService extends GenericService<Nota> {
    constructor(protected server: Server) { 
        super(server, '/modules/notas/notas')
    }
}