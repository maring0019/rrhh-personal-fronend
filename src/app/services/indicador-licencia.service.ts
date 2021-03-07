import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';

import { IndicadorLicencia } from '../models/IndicadorLicencia';
import { GenericService } from './generic.service';



@Injectable()
export class IndicadorLicenciaService extends GenericService<IndicadorLicencia> {
    constructor(protected server: Server) { 
        super(server, '/modules/ausentismo/indicadores-licencias')
    }

    getLicenciasByAgente(agenteId):Observable<IndicadorLicencia[]> {
        const url = `${this.url}/agentes/${agenteId}`;
        return this.server.get(url);
    }

    getLicenciasTotales(agenteId): Observable<any[]> {
        const url = `${this.url}/agentes/${agenteId}/totales`;
        return this.server.get(url);
    }
}