import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter, OnChanges } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
    selector: 'app-nav-calendar',
    templateUrl: 'nav-calendar.html'
})

export class NavCalendarComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() ausencias;
    @Input() mesSeleccionado:Date;
    @Output() changedDate: EventEmitter<Date> = new EventEmitter<Date>();
    
    @ViewChild('calendarprev') calendarPrev: FullCalendarComponent;
    @ViewChild('calendarcenter') calendarCenter: FullCalendarComponent;
    @ViewChild('calendarnext') calendarNext: FullCalendarComponent;
    
    mesesRange:Date[] = [];
    mesesRangeSelection:Boolean[] = [false,false,false]
    
    calendarPlugins = [dayGridPlugin];
    calendarApiIsReady:Boolean = false;
    
    header = {
        left: '',
        center: 'title',
        right: ''
    };
    columnHeaderText = (date: Date) : string => {
        var days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
        var shortDayName = days[date.getDay()];
        return shortDayName;
    }

    public ngOnInit() {
    }

    ngOnChanges(){
        this.resetMonthRange(this.mesSeleccionado);
    }

    ngAfterViewInit(){
        this.calendarApiIsReady = true;
        this.resetMonthRange(this.mesSeleccionado);
    }

    resetMonthRange(date){
        if (this.calendarApiIsReady){
            if (!date){
                date = new Date();
            }
            let mesCenter = date;
            let mesPrev = new Date(new Date(mesCenter).setMonth(mesCenter.getMonth()-1));
            let mesNext = new Date(new Date(mesCenter).setMonth(mesCenter.getMonth()+1));
            this.mesesRange = [mesPrev, mesCenter, mesNext];
            this.calendarPrev.getApi().gotoDate(mesPrev);
            this.calendarCenter.getApi().gotoDate(mesCenter);
            this.calendarNext.getApi().gotoDate(mesNext);
            this.indicarMesSeleccionado();
        }
    }

    indicarMesSeleccionado(){
        this.mesesRangeSelection = [false, false, false];
        this.mesesRange.forEach((element, index) => {
            if (this.mesSeleccionado.getTime() === element.getTime()){
                this.mesesRangeSelection[index] = true;
            }
        });
    }

    gotoNextRange(){
        this.resetMonthRange(this.mesesRange[2]);
    }

    gotoPreviousRange(){
        this.resetMonthRange(this.mesesRange[0]);
    }


    seleccionarMes(index){
        this.mesSeleccionado = this.mesesRange[index];
        this.indicarMesSeleccionado();
        this.changedDate.emit(new Date(this.mesSeleccionado));
    }


}
