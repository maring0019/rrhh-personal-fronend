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
        return this.feriadoService.getAsEventos(params);
    }

    getAusencias(params?: any): Observable<IEventoCalendar[]> {
        return this.agenteService.getAusenciasAsEventos(params);
    }

    getFrancos(params?: any): Observable<IEventoCalendar[]> {
        return this.francoService.getAsEventos(params);
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

    removeAusentismo(object:Ausentismo):Observable<[any,IEventoCalendar[]]>{
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
        return this.francoService.deleteFrancos(francosToRemove.map(f=>f._id));
    }

    mapFranco(franco){
        return {
            '_id': franco._id,
            'title': franco.descripcion? franco.descripcion: 'Franco',
            'start': franco.fecha,
            'allDay': true,
            'backgroundColor': "transparent",
            'textColor': 'grey',
            'type': 'FRANCO',
            'ausentismoFechaDesde': franco.fecha,
            'ausentismoFechaHasta': franco.fecha
          }
    }


    mapAusencia(ausencia, ausentismo){
        return {
            '_id': ausentismo._id,
            'title':  `ART. ${ausentismo.articulo.codigo}`,
            'start': ausencia.fecha,
            'allDay': true,
            'backgroundColor': "transparent",
            'textColor': ausentismo.articulo.color? ausentismo.articulo.color: '#002738',
            'type': 'AUSENCIA',
            'ausentismoFechaDesde': ausentismo.fechaDesde,
            'ausentismoFechaHasta': ausentismo.fechaHasta
        }
    }

}