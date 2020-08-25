import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';

import { GenericService } from './generic.service';
import { Usuario } from 'src/app/models/Usuario';


@Injectable()
export class UsuarioService extends GenericService<Usuario> {
    constructor(protected server: Server) { 
        super(server, '/modules/seguridad/usuarios')
    }
}