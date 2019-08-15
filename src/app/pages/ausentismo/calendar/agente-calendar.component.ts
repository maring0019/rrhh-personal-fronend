import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { AgenteService } from 'src/app/services/agente.service';
import { EventosCalendarService } from 'src/app/services/eventos.calendar.service';
import { CalendarStoreService } from 'src/app/stores/calendar.store.service';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { IAusenciaEvento } from 'src/app/models/IAusenciaEvento';





export interface DateRangeSelection {
    fechaDesde: Date,
    fechaHasta: Date
}

@Component({
    selector: 'app-agente-calendar',
    templateUrl: 'agente-calendar.html',
    styleUrls: ['./agente-calendar.scss']
})

export class AgenteCalendarComponent implements OnInit {

    eventos: IAusenciaEvento[];
    ausencias: IAusenciaEvento[];
    feriados: IAusenciaEvento[];
    francos: IAusenciaEvento[];
    weekends: Boolean = true;
    mesMainDefault:Date = new Date();
    mesNavDefault:Date = new Date();
    dateRangeSelection: DateRangeSelection;
    ausentismoSeleccionado: Ausentismo = null;
    agenteID:any;
    // TODO: Analizar de enviar todas las opciones del calendario por esta variable
    options:any = {
        weekends: true,
        defaultDate: new Date()
    }

    storeSubscription: Subscription;

    constructor(
        private calendarStoreService: CalendarStoreService,
        private agenteService: AgenteService,
        private eventosService: EventosCalendarService,
        private route: ActivatedRoute){}
    
    public ngOnInit() {
        this.route.params.subscribe(
            params =>{
                this.agenteID = params['agenteId'];
                // this.refreshAusencias();
                this.refreshEventos();
            }
        );
    }

    onChangeNavDate(date){
        this.mesMainDefault = new Date(date);
    }

    onChangeMainDate(date){
        this.mesNavDefault = new Date(date);
    }

    onChangeHeaderDate(date){
        this.mesMainDefault = new Date(date);
        this.mesNavDefault = new Date(date);
    }

    onChangeHeaderWeekends(value){
        this.weekends = value;
    }

    onToggleFeriados(value){
        if (value){
            this.calendarStoreService.addFeriados();
        }
        else{
            this.calendarStoreService.removeFeriados();
        }
    }

    onActivate(componentRef){
        console.log('Se activo el componente interno');
        console.log(componentRef);
        // this.refreshAusencias();
        // if (componentRef instanceof AusentismoSearchComponent) this.handleSearchComponentEvents(componentRef);
    }


    refreshEventos(){
        this.storeSubscription = this.calendarStoreService.getEventos(this.agenteID)
            .subscribe(eventos => this.eventos = eventos)
    }   
}
