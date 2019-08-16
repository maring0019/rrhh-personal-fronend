import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { AgenteService } from 'src/app/services/agente.service';
import { EventosCalendarService } from 'src/app/services/eventos.calendar.service';
import { CalendarStoreService } from 'src/app/stores/calendar.store.service';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { Franco } from 'src/app/models/Franco';
import { IAusenciaEvento } from 'src/app/models/IAusenciaEvento';

import { getWeekdays } from 'src/app/utils/dates';


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

    onToggleWeekends(value){
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

    onToggleFrancos(value){
        if (value){
            let weekends = getWeekdays(this.mesNavDefault.getMonth(), this.mesNavDefault.getFullYear());
            let francos:Franco[] = weekends.map(f => f = {fecha:f, agente:{id:this.agenteID}});
            this.calendarStoreService.addFrancos(francos);
        }
        else{
            console.log('Hay que quitar los francos?')
            // this.calendarStoreService.removeFeriados();
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
