import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Server } from '@andes/shared';

import { IEventoCalendar } from '../models/IEventoCalendar';

import { AgenteService } from './agente.service';
import { FeriadoService } from './feriado.service';
import { FrancoService } from 'src/app/services/franco.service';
import { AusentismoService } from 'src/app/services/ausentismo.service';

import { Franco } from 'src/app/models/Franco';
import { Ausentismo } from 'src/app/models/Ausentismo';



@Injectable()
export class EventosCalendarService {
    private url = '/modules/ausentismo/IEventoCalendars'; // URL to web api
    
    constructor(
        private server: Server,
        private feriadoService: FeriadoService,
        private agenteService: AgenteService,
        private francoService: FrancoService,
        private ausentismoService: AusentismoService
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

    addAusentismo(object:Ausentismo):Observable<[any,IEventoCalendar[]]>{
        return this.ausentismoService.postAusentismo(object).pipe(
            map(ausentismo => {
                let ausencias:IEventoCalendar[] = [];
                if (!ausentismo.warnings){
                    ausencias = ausentismo.ausencias
                        .map( aus => { return {
                            'id': aus.id,
                            'title': aus.articulo.codigo,
                            'start': aus.fecha,
                            'allDay': true,
                            'color':'',
                            'type': 'AUSENCIA',
                            'ausentismoFechaDesde': ausentismo.fechaDesde,
                            'ausentismoFechaHasta': ausentismo.fechaHasta
                        }
                    });
                }
                let output:[any, IEventoCalendar[]] = [ausentismo, ausencias];
                return output;
            })
        )
    }

    
    getFrancos(params?: any): Observable<IEventoCalendar[]> {
        return this.francoService.get(params).pipe(
            map(data =>
                data.map(franco=> {
                    return this.mapFranco(franco);
                })
            )
        );
    }

    addFrancos(objects: Franco[]): Observable<IEventoCalendar[]> {
        return this.francoService.addFrancos(objects).pipe(
            map(data => 
                data.map(franco=> {
                    return this.mapFranco(franco);
                })
            )
            
        )
    }

    removeFrancos(francosToRemove){
        return this.francoService.deleteFrancos(francosToRemove.map(f=>f.id));
    }

    mapFranco(franco){
        return {
            'id': franco.id,
            'title': franco.descripcion? franco.descripcion: 'Franco',
            'start': franco.fecha,
            'allDay': true,
            'color':'grey',
            'type': 'FRANCO',
            'ausentismoFechaDesde': franco.fecha,
            'ausentismoFechaHasta': franco.fecha
          }
    }

}