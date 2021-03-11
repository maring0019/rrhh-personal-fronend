import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { GenericService } from './generic.service';
import { SubPuesto } from '../models/Subpuesto';


@Injectable()
export class SubPuestoService extends GenericService<SubPuesto> {
    constructor(protected server: Server) { 
        super(server, '/core/organigrama/subpuestos')
    }
}