import { Component, OnInit, Input } from '@angular/core';
import { Agente } from 'src/app/models/Agente';
import { AgenteService } from 'src/app/services/agente.service';
import { IAusenciaEvento } from 'src/app/models/IAusenciaEvento';
import { Ausentismo } from 'src/app/models/Ausentismo';

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
    @Input() agente: Agente;
    ausencias: IAusenciaEvento[];
    weekends: Boolean = true;
    mesMainDefault:Date = new Date();
    mesNavDefault:Date = new Date();
    dateRangeSelection: DateRangeSelection;
    ausentismoSeleccionado: Ausentismo;
    
    // TODO: Analizar de enviar todas las opciones del calendario por esta variable
    options:any = {
        weekends: true,
        defaultDate: new Date()
    }

    constructor(
        private agenteService:AgenteService,
        ){}
    
    public ngOnInit() {
        this.agenteService.getAusencias(this.agente.id).subscribe((data) => {
            this.ausencias = data;
        });
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

    onNuevasAusencias(ausencias){
        if (ausencias && ausencias.length){
            this.ausencias = this.ausencias.concat(ausencias); // Creates a new array!
        }
    }

    onAusentismoSelected(ausentismo){
        this.ausentismoSeleccionado = ausentismo;
        if (ausentismo){
            this.dateRangeSelection = {
                fechaDesde: ausentismo.fechaDesde,
                fechaHasta: ausentismo.fechaHasta
            }
        }
        else {
            this.dateRangeSelection = null;
        }
    }
}
