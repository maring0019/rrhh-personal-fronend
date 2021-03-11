import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { GenericService } from './generic.service';
import { Pais } from './../models/Pais';


@Injectable()
export class PaisService extends GenericService<Pais> {
    constructor(protected server: Server) { 
        super(server, '/core/tm/paises')
    }
}