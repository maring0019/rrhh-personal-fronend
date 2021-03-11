import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { GenericService } from './generic.service';
import { Puesto } from '../models/Puesto';


@Injectable()
export class PuestoService extends GenericService<Puesto> {
    constructor(protected server: Server) { 
        super(server, '/core/organigrama/puestos')
    }
}