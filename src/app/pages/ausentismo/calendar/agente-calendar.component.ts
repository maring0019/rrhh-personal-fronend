import { Component, OnInit, Input } from '@angular/core';
import { Agente } from 'src/app/models/Agente';
import { Ausencia } from 'src/app/models/Ausencia';
import { AgenteService } from 'src/app/services/agente.service';


@Component({
    selector: 'app-agente-calendar',
    templateUrl: 'agente-calendar.html',
    styleUrls: ['./agente-calendar.scss']
})

export class AgenteCalendarComponent implements OnInit {
    @Input() agente: Agente;
    ausencias: any[];
    weekends: Boolean = true;
    mesMainDefault:Date = new Date(2013, 1, 1);
    mesNavDefault:Date = new Date(2013, 1, 1);
    
    // TODO: Analizar de enviar todas las opciones del calendario por esta variable
    options:any = {
        weekends: true,
        defaultDate: new Date(2013, 1, 1)
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
}
