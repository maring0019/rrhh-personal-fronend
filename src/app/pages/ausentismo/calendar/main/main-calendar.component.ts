import { Component, OnInit, ViewChild, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';

import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'app-main-calendar',
    templateUrl: 'main-calendar.html'
})

export class MainCalendarComponent implements OnInit, AfterViewInit {
    @Input() ausencias;
    @Input() options;
    @Input() mesSeleccionado:Date;
    @Input() weekends:Boolean;
    @Output() changedDate: EventEmitter<Date> = new EventEmitter<Date>();
   
    @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template
    
    calendarApi:any;
    mesVisualizado:Date = new Date(2013, 1, 1);
    
    calendarPlugins = [dayGridPlugin];

    header = {
        left: '',
        center: 'title',
        right: ''
    };
    columnHeaderText = (date: Date) : string => {
        var days = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
        var shortDayName = days[date.getDay()];
        return shortDayName;
    }
    
    public ngOnInit() {

    }

    ngAfterViewInit(){
        this.calendarApi = this.calendarComponent.getApi();
    }

    ngOnChanges(){
        if (this.mesSeleccionado != this.mesVisualizado){
            this.mesVisualizado = this.mesSeleccionado;
            if (this.calendarApi){
                this.calendarApi.gotoDate(this.mesVisualizado);
            }
            
        }
    }

    gotoNextMonth(){
        this.mesVisualizado.setMonth(this.mesVisualizado.getMonth()+1);
        this.calendarApi.gotoDate(this.mesVisualizado);
        this.changedDate.emit(this.mesVisualizado);
    }

    gotoPreviousMonth(){
        this.mesVisualizado.setMonth(this.mesVisualizado.getMonth()-1);
        this.calendarApi.gotoDate(this.mesVisualizado);
        this.changedDate.emit(this.mesVisualizado);
    }
}
