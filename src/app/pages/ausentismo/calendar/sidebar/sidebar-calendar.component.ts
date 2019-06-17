import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Agente } from 'src/app/hardcodeo/agente';
import { AusenciaPeriodo } from 'src/app/models/AusenciaPeriodo';
import { IAusenciaEvento } from 'src/app/models/IAusenciaEvento';

@Component({
    selector: 'app-sidebar-calendar',
    templateUrl: 'sidebar-calendar.html'
})
export class SidebarCalendarComponent implements OnInit {
    @Input() agente: Agente;
    @Input() fechaDesde: Date;
    @Output() outputAusencias: EventEmitter<IAusenciaEvento[]> = new EventEmitter<IAusenciaEvento[]>();
    
    periodoCarga: AusenciaPeriodo;

    public ngOnInit() {
        this.periodoCarga = new AusenciaPeriodo({
            agente : this.agente,
            fechaDesde: this.fechaDesde? this.fechaDesde : new Date()
        })
    }

    onNuevasAusencias(ausencias){
        this.outputAusencias.emit(ausencias);
    }



}