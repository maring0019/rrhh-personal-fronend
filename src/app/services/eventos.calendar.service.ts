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
                        // 'rendering': 'background',
                        'backgroundColor': '#e9e9e9',
                        'textColor':'#7d7d7d',
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
                    let evento = this.mapAusencia(ausentismo.ausencias, ausentismo)  
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
                        .map( aus => { return this.mapAusencia(aus, ausentismo)
                    });
                }
                let output:[any, IEventoCalendar[]] = [ausentismo, ausencias];
                return output;
            })
        )
    }


    updateAusentismo(object:Ausentismo):Observable<[any,IEventoCalendar[]]>{
        return this.ausentismoService.putAusentismo(object).pipe(
            map(ausentismo => {
                let ausencias:IEventoCalendar[] = [];
                if (!ausentismo.warnings){
                    ausencias = ausentismo.ausencias
                        .map( aus => { return this.mapAusencia(aus, ausentismo)
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
            // 'rendering': 'background',
            'color':'grey',
            'type': 'FRANCO',
            'ausentismoFechaDesde': franco.fecha,
            'ausentismoFechaHasta': franco.fecha
          }
    }


    mapAusencia(ausencia, ausentismo){
        return {
            'id': ausencia.id? ausencia.id:ausencia._id,
            'title':  `ART. ${ausentismo.articulo.codigo}`,
            'start': ausencia.fecha,
            'allDay': true,
            'backgroundColor': ausentismo.articulo.color? ausentismo.articulo.color: '#bce8f1',
            'color':'',
            'type': 'AUSENCIA',
            'ausentismoFechaDesde': ausentismo.fechaDesde,
            'ausentismoFechaHasta': ausentismo.fechaHasta
        }
    }

}