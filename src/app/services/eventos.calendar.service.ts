import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Server } from '@andes/shared';

import { IEventoCalendar } from '../models/IEventoCalendar';
import { FeriadoService } from './feriado.service';
import { AgenteService } from './agente.service';


@Injectable()
export class EventosCalendarService {
    private url = '/modules/ausentismo/IEventoCalendars'; // URL to web api
    
    constructor(
        private server: Server,
        private feriadoService: FeriadoService,
        private agenteService: AgenteService
    ) { }


    getFeriados(params?: any): Observable<IEventoCalendar[]> {
        return this.feriadoService.get(params).pipe(
            map(data =>
                data.map(feriado=> {
                    let evento = {
                        'id': feriado.id,
                        'title': feriado.descripcion? feriado.descripcion: 'Feriado',
                        'start': feriado.fecha,
                        'allDay': true,
                        'color':'green',
                        'type': 'FERIADO',
                        'ausentismoFechaDesde': feriado.fecha,
                        'ausentismoFechaHasta': feriado.fecha
                      }
                      return evento;
                })
            )
        );
    }

    getAusencias(params?: any): Observable<IEventoCalendar[]> {
        return this.agenteService.getAusencias(params).pipe(
            map(data =>
                data.map(ausentismo=> {
                    let evento = {
                        'id': ausentismo.ausencias.id,
                        'title': ausentismo.ausencias.articulo.codigo,
                        'start': ausentismo.ausencias.fecha,
                        'allDay': true,
                        'color':'',
                        'type': 'AUSENCIA',
                        'ausentismoFechaDesde': ausentismo.fechaDesde,
                        'ausentismoFechaHasta': ausentismo.fechaHasta
                      }
                      return evento;
                })
            )
        );
    }

    // post(object: IEventoCalendar): Observable<IEventoCalendar> {
    //     return this.server.post(this.url, object);
    // }

    // put(object: IEventoCalendar): Observable<IEventoCalendar> {
    //     const url = `${this.url}/${object.id}`;
    //     return this.server.put(url, object);
    // }

}