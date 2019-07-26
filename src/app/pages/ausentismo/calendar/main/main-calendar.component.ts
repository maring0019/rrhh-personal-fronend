import { Component, OnInit, ViewChild, Input, Output, AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DateRangeSelection } from '../agente-calendar.component';

import { CalendarRangeSelectorService } from 'src/app/services/calendar-range-selector.service';

@Component({
    selector: 'app-main-calendar',
    templateUrl: 'main-calendar.html'
})

export class MainCalendarComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() ausencias;
    @Input() options;
    @Input() mesSeleccionado:Date;
    @Input() weekends:Boolean;

    @Input() set periodoSeleccionado(periodo: DateRangeSelection) {
        this.seleccionarPeriodo(periodo);
    }

    @Output() changedDate: EventEmitter<Date> = new EventEmitter<Date>();
   
    @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

    subscription: Subscription;
    
    constructor(
        private rangeSelectorService: CalendarRangeSelectorService){
            this.subscription = this.rangeSelectorService.getState().subscribe(
                rangeSelection => {
                    this.seleccionarPeriodo(rangeSelection);
            });
        }

    
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
      }

    public gotoNextMonth(){
        this.mesVisualizado.setMonth(this.mesVisualizado.getMonth()+1);
        this.calendarApi.gotoDate(this.mesVisualizado);
        this.changedDate.emit(this.mesVisualizado);
    }

    public gotoPreviousMonth(){
        this.mesVisualizado.setMonth(this.mesVisualizado.getMonth()-1);
        this.calendarApi.gotoDate(this.mesVisualizado);
        this.changedDate.emit(this.mesVisualizado);
    }

    seleccionarPeriodo(periodo:DateRangeSelection){
        if (periodo){
            this.calendarApi.select(periodo.fechaDesde, periodo.fechaHasta );
        }
        else{
            if (this.calendarApi){
                this.calendarApi.unselect();
            }
        }
    }
}
