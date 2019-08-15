import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import {shareReplay, map} from 'rxjs/operators'
// import { uuid } from './uuid';

// import {IEventoCalendarsService} from './eventos.service';
import { FeriadoService } from '../services/feriado.service';
import { AusentismoService } from '../services/ausentismo.service';

import { combineLatest, forkJoin } from 'rxjs';
import { EventosCalendarService } from 'src/app/services/eventos.calendar.service';
import { IEventoCalendar } from 'src/app/models/IEventoCalendar';

export interface IDateRangeSelection {
    fechaDesde: Date,
    fechaHasta: Date
}

@Injectable()
export class CalendarStoreService {

    constructor(
        private eventosService: EventosCalendarService,
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

    // Expose the observable$ part of the _eventos subject (read only stream)
    readonly eventos$ = this._eventos.asObservable();
    readonly selectionRange$ = this._selectionRange.asObservable();



    feriados: IEventoCalendar[];
    ausencias: IEventoCalendar[];

    get selectionRange(): IDateRangeSelection {
        return this._selectionRange.getValue();
    }

    set selectionRange(val: IDateRangeSelection) {
        if (this.selectionRange && val){
            if (this.selectionRange.fechaDesde.getTime() != val.fechaDesde.getTime()
            || this.selectionRange.fechaHasta.getTime() != val.fechaHasta.getTime()){
                this._selectionRange.next(val);
            }            
        }
        else{
            if ((this.selectionRange && !val) || (!this.selectionRange && val)){
                this._selectionRange.next(val);
            }
        }
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

  
    addFeriados(){
        this.eventos = this.eventos.concat(this.feriados);
    }

    removeFeriados(){
        this.eventos = this.eventos.filter( x => !this.feriados.filter( y => y.id === x.id).length);
    }

    fetchAll(agenteID) {
        let feriados$ = this.eventosService.getFeriados();
        let ausencias$ = this.eventosService.getAusencias(agenteID);
        forkJoin(feriados$, ausencias$).subscribe( 
            ([feriados, ausencias]) => {
                this.feriados = feriados;
                this.ausencias = ausencias;
                this.eventos = feriados.concat(ausencias);
            }   
        )
    }

    getEventos(agenteID){
        this.fetchAll(agenteID);
        return this.eventos$;
    }


//   async addIEventoCalendar(title: string) {

//     if(title && title.length) {

//       // This is called an optimistic update
//       // updating the record locally before actually getting a response from the server
//       // this way, the interface seems blazing fast to the enduser
//       // and we just assume that the server will return success responses anyway most of the time.
//       // if server returns an error, we just revert back the changes in the catch statement 

//       const tmpId = uuid();
//       const tmpIEventoCalendar = {id: tmpId, title, isCompleted: false};

//       this.eventos = [
//         ...this.eventos, 
//         tmpIEventoCalendar
//       ];

//       try {
//         const todo = await this.eventosService
//           .create({title, isCompleted: false})
//           .toPromise();

//         // we swap the local tmp record with the record from the server (id must be updated)
//         const index = this.eventos.indexOf(this.eventos.find(t => t.id === tmpId));
//         this.eventos[index] = {
//           ...todo
//         }
//         this.eventos = [...this.eventos];
//       } catch (e) {
//         // is server sends back an error, we revert the changes
//         console.error(e);
//         this.removeIEventoCalendar(tmpId, false);
//       }
      
//     }

//   }

//   async removeIEventoCalendar(id: string, serverRemove = true) {
//     // optimistic update
//     const todo = this.eventos.find(t => t.id === id);
//     this.eventos = this.eventos.filter(todo => todo.id !== id);

//     if(serverRemove) {
//       try {
//         await this.eventosService.remove(id).toPromise();
//       } catch (e) {
//         console.error(e);
//         this.eventos = [...this.eventos, todo];
//       }

//     }

//   }

//   async setCompleted(id: string, isCompleted: boolean) {
//     let todo = this.eventos.find(todo => todo.id === id);

//     if(todo) {
//       // optimistic update
//       const index = this.eventos.indexOf(todo);

//       this.eventos[index] = {
//         ...todo,
//         isCompleted
//       }

//       this.eventos = [...this.eventos];

//       try {
//         await this.eventosService
//           .setCompleted(id, isCompleted)
//           .toPromise();

//       } catch (e) {

//         console.error(e);
//         this.eventos[index] = {
//           ...todo,
//           isCompleted: !isCompleted
//         }
//       }
//     }
//   }

    
}