import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { RegimenHorario } from '../models/RegimenHorario';
import { GenericService } from './generic.service';

@Injectable()
export class RegimenHorarioService extends GenericService<RegimenHorario> {
    constructor(protected server: Server) { 
        super(server, '/core/tm/regimenhorarios')
    }
}