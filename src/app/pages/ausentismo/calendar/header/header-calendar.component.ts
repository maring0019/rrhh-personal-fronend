import { Component, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
    selector: 'app-header-calendar',
    templateUrl: 'header-calendar.html'
})
export class HeadCalendarComponent implements OnInit {
    @Output() changedDate: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() changedWeekends: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    
    fechaSeleccion:Date;
    showWeekends:Boolean = true;

    public ngOnInit() {
    }

    onChangedDate(evento){
        if (evento.value){
            this.changedDate.emit(evento.value);
        }
    }

    onChangedShowWeekends(evento){
        if (evento){
            this.changedWeekends.emit(evento.value);
        }
    }
}
