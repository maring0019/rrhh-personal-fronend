import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AgenteService } from 'src/app/services/agente.service';

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

    ausencias: IAusenciaEvento[];
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

    constructor(
        private agenteService:AgenteService,
        private route: ActivatedRoute){}
    
    public ngOnInit() {
        this.route.params.subscribe(
            params =>{
                this.agenteID = params['agenteId'];
                this.refreshAusencias();
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

    onActivate(componentRef){
        console.log('Se activo el componente interno');
        console.log(componentRef);
        this.refreshAusencias();
        // if (componentRef instanceof AusentismoSearchComponent) this.handleSearchComponentEvents(componentRef);
    }

    refreshAusencias(){
        if (this.agenteID){
            this.agenteService.getAusencias(this.agenteID).subscribe((data) => {
                    this.ausencias = data;
            });
        }
    }
}
