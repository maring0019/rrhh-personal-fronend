import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';

import { IndicadorLicencia } from '../models/IndicadorLicencia';
import { GenericService } from './generic.service';



@Injectable()
export class IndicadorLicenciaService extends GenericService<IndicadorLicencia> {
    constructor(protected server: Server) { 
        super(server, '/modules/ausentismo/indicadores-licencias')
    }
}