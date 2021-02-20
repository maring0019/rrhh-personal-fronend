import { Injectable } from '@angular/core';

import { Server } from '@andes/shared';
import { RecargoJustificacion } from '../models/RecargoJustificacion';
import { GenericService } from './generic.service';

@Injectable()
export class RecargoJustificacionService extends GenericService<RecargoJustificacion> {
    constructor(protected server: Server) { 
        super(server, '/modules/recargos/recargojustificaciones')
    }
}