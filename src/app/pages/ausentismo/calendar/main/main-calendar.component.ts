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
        this._rangeSelection = periodo;
        this.seleccionarPeriodo();
    }

    @Output() changedDate: EventEmitter<Date> = new EventEmitter<Date>();
   
    @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

    subscription: Subscription;
    private _rangeSelection:DateRangeSelection;
    
    constructor(
        private rangeSelectorService: CalendarRangeSelectorService){
            this.subscription = this.rangeSelectorService.getState().subscribe(
                rangeSelection => {
                    this._rangeSelection = rangeSelection;
                    // Por un tema se sincronismo de la API del calendario, 
                    // 1ero se debe actualizar la vista seleccionada (api.gotoDate)
                    // 2do se debe indicar el periodo seleccionado   (api.select)
                    if (this._rangeSelection && this._rangeSelection.fechaDesde){
                        this.updateSelectedMonthView(this._rangeSelection.fechaDesde);
                    }
                    this.seleccionarPeriodo();
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
        this.updateSelectedMonthView(this._getNextMonth(this.mesVisualizado));
        this.seleccionarPeriodo();
    }

    public gotoPreviousMonth(){
        this.updateSelectedMonthView(this._getPrevMonth(this.mesVisualizado));
        this.seleccionarPeriodo();
    }

    private updateSelectedMonthView(newMonth:Date){
        this.mesVisualizado = newMonth;
        this.calendarApi.gotoDate(this.mesVisualizado);
        this.changedDate.emit(this.mesVisualizado);
    }

    private seleccionarPeriodo(){
        if (this._rangeSelection){
            this.calendarApi.select(this._rangeSelection.fechaDesde, this._rangeSelection.fechaHasta );
        }
        else{
            if (this.calendarApi){
                this.calendarApi.unselect();
            }
        }
    }

    private _getNextMonth(currentMonth:Date):Date{
        return new Date(new Date(currentMonth).setMonth(currentMonth.getMonth()+1));
    }

    private _getPrevMonth(currentMonth:Date):Date{
        return new Date(new Date(currentMonth).setMonth(currentMonth.getMonth()-1));
    }
}
