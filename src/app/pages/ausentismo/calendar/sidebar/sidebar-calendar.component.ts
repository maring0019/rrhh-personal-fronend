import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Agente } from 'src/app/hardcodeo/agente';
import { Ausentismo } from 'src/app/models/Ausentismo';
import { IAusenciaEvento } from 'src/app/models/IAusenciaEvento';

@Component({
    selector: 'app-sidebar-calendar',
    templateUrl: 'sidebar-calendar.html'
})
export class SidebarCalendarComponent implements OnInit {
    @Input() agente: Agente;
    @Input() fechaDesde: Date;
    @Output() outputAusencias: EventEmitter<IAusenciaEvento[]> = new EventEmitter<IAusenciaEvento[]>();
    
    periodoCarga: Ausentismo;

    public ngOnInit() {
        this.periodoCarga = new Ausentismo({
            agente : this.agente,
            fechaDesde: this.fechaDesde? this.fechaDesde : new Date()
        })
    }

    onNuevasAusencias(ausencias){
        this.outputAusencias.emit(ausencias);
    }



}