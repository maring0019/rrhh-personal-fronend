import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

import { forkJoin } from 'rxjs';
import { EventosCalendarService } from 'src/app/services/eventos.calendar.service';

import { FrancoService } from 'src/app/services/franco.service';
import { AusentismoService } from 'src/app/services/ausentismo.service';

import { IEventoCalendar } from 'src/app/models/IEventoCalendar';
import { Franco } from 'src/app/models/Franco';
import { Ausentismo } from 'src/app/models/Ausentismo';
import { getTomorrow } from '../utils/dates';

export interface IDateRangeSelection {
    fechaDesde: Date,
    fechaHasta: Date,
    source?: String // Indica el origen o quien realizo la seleccion
}

@Injectable()
export class CalendarStoreService {

    constructor(
        private eventosService: EventosCalendarService,
        private francoService: FrancoService,
        private ausentismoService: AusentismoService

    ) {
        // this.fetchAll();
    }

    // - We set the initial state in BehaviorSubject's constructor
    // - Nobody outside the Store should have access to the BehaviorSubject 
    //   because it has the write rights
    // - Writing to state should be handled by specialized Store methods (ex: addIEventoCalendar, removeIEventoCalendar, etc)
    // - Create one BehaviorSubject per store entity, for example if you have IEventoCalendarGroups
    //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
    private readonly _eventos = new BehaviorSubject<IEventoCalendar[]>([]);
    private readonly _selectionRange = new BehaviorSubject<IDateRangeSelection>({ fechaDesde: new Date(), fechaHasta: new Date() });
    private readonly _ausentismoSelected = new BehaviorSubject<any>(null);

    // Expose the observable$ part of the _eventos subject (read only stream)
    readonly eventos$ = this._eventos.asObservable();
    readonly selectionRange$ = this._selectionRange.asObservable();
    readonly ausentismoSelected$ = this._ausentismoSelected.asObservable(); 

    private _feriados: IEventoCalendar[]; // Contiene todos los feriados 
    feriados: IEventoCalendar[] =[];  // Puede o no contener los feriados dependiendo de si se visualizan o no en el listado de eventos
    ausencias: IEventoCalendar[] = []; 
    francos: IEventoCalendar[] = [];

    get selectionRange(): IDateRangeSelection {
        return this._selectionRange.getValue();
    }

    set selectionRange(val: IDateRangeSelection) {
        if (val && val.fechaHasta) val.fechaHasta = getTomorrow(val.fechaHasta);
        if (this.selectionRange && val){
            if (this.selectionRange.fechaDesde.getTime() != val.fechaDesde.getTime()
            || this.selectionRange.fechaHasta.getTime() != val.fechaHasta.getTime()){
                this._selectionRange.next(val);
            }            
        }

        else{
            this._selectionRange.next(val);
        }
    }

    get ausentismoSelected(){
        return this._ausentismoSelected.getValue();
    }

    set ausentismoSelected(val:any){
        this._ausentismoSelected.next(val);
    }

    // the getter will return the last value emitted in _eventos subject
    get eventos(): IEventoCalendar[] {
        return this._eventos.getValue();
    }


    // assigning a value to this.eventos will push it onto the observable 
    // and down to all of its subsribers (ex: this.eventos = [])
    set eventos(val: IEventoCalendar[]) {
        this._eventos.next(val);
    }

  
    showFeriados(){
        this.feriados = this._feriados;
        this.refreshEventos();
    }

    hideFeriados(){
        this.feriados = [];
        this.refreshEventos();
    }

    addAusentismo(ausentismo: Ausentismo): Observable<any>{
        return this.eventosService.addAusentismo(ausentismo).pipe(
            map(data => {
                let ausentismo = data[0];
                let ausencias = data[1];
                if (!ausentismo.warnings){
                    this.ausencias = this.ausencias.concat(ausencias);
                    this.refreshEventos();   
                }
                return ausentismo;
            })
        );
    }

    updateAusentismo(ausentismoToUpdate:Ausentismo, ausentismoActual:Ausentismo){
        let ausenciasToRemove = ausentismoActual.ausencias;
        return this.eventosService.updateAusentismo(ausentismoToUpdate).pipe(
            map(data => {
                let ausentismo = data[0];
                let ausencias = data[1];
                if (!ausentismo.warnings){
                    this.ausencias = this.filterAB(this.ausencias, ausenciasToRemove);
                    this.ausencias = this.ausencias.concat(ausencias);
                    this.refreshEventos();   
                }
                return ausentismo;
            })
        );
    }

    addFrancos(francos:Franco[]){
        this.eventosService.addFrancos(francos).subscribe(
            eventosFranco => {
                this.francos = this.francos.concat(eventosFranco);
                this.refreshEventos();
            },
            error =>{
                console.log('Tenemos un problema. Fixme');
            }
        )
    }

    removeFrancos(weekends:Date[]){
        let francosToRemove = [];
        for (const day of weekends){
            const franco = this.francos.find( f => f.start.getTime() == day.getTime());
            if (franco) francosToRemove.push(franco);
        }
        this.eventosService.removeFrancos(francosToRemove).subscribe(
            francos => {
                this.francos = this.filterAB(this.francos, francosToRemove);
                this.refreshEventos();
            },
            error =>{
                console.log('Tenemos un problema. Fixme');
            }
        )
    }


    /**
     * Utilidad para quitar/filtrar todos los elementos de una lista que estan presentes
     * en otra lista. Se utiliza el atributo id para realizar la comparacion entre elementos
     * @param listA lista a filtrar
     * @param listB elementos a filtrar en listA
     */
    private filterAB(listA, listB){
        return listA.filter( x => !listB.filter( y => y.id === x.id).length);
    }
    

    private fetchAll(agenteID) {
        let feriados$ = this.eventosService.getFeriados();
        let ausencias$ = this.eventosService.getAusencias(agenteID);
        let francos$ = this.eventosService.getFrancos({ 'agenteID': agenteID} );
        forkJoin(feriados$, ausencias$, francos$).subscribe( 
            ([feriados, ausencias, francos]) => {
                this._feriados = feriados;
                this.feriados = feriados;
                this.ausencias = ausencias;
                this.francos = francos;
                this.refreshEventos();
            }   
        )
    }

    /**
     * Actualiza el listado de eventos (feriados + francos + ausencias). Preferentemente
     * cada vez que se modifica alguna sublista del listado de eventos se deberia llamar
     * a este metodo para obtener un nuevo listado de eventos actualizado a la ultima version
     */
    private refreshEventos(){
        this.eventos = this.feriados.concat(this.ausencias).concat(this.francos);
    }

    getEventos(agenteID){
        this.fetchAll(agenteID);
        return this.eventos$;
    }
    
}