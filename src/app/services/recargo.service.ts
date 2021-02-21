import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { Recargo } from '../models/Recargo';
import { GenericService } from './generic.service';

@Injectable()
export class RecargoService extends GenericService<Recargo> {
    constructor(protected server: Server) { 
        super(server, '/modules/recargos/recargos')
    }
}