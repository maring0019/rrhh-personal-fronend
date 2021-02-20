import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { RecargoTurno } from '../models/RecargoTurno';
import { GenericService } from './generic.service';

@Injectable()
export class RecargoTurnoService extends GenericService<RecargoTurno> {
    constructor(protected server: Server) { 
        super(server, '/modules/recargos/recargoturnos')
    }
}