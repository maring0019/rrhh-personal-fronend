import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-header-calendar',
    templateUrl: 'header-calendar.html',
    styleUrls: ['./header-calendar.scss']
})
export class HeadCalendarComponent implements OnInit {
    @Output() changedDate: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() showHideWeekends: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    @Output() showHideFeriados: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    @Output() saltarFrancos: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    
    public fechaSeleccion:Date;
    public showWeekends:Boolean = true;
    public showFeriados:Boolean = true;
    public showFrancos:Boolean = false;
    
    agenteID:String;

    constructor(
        private route: ActivatedRoute){}

    public ngOnInit() {
        this.route.params.subscribe(
            params =>{
                this.agenteID = params['agenteId'];
            }
        );
    }

    onChangedDate(evento){
        if (evento.value){
            this.changedDate.emit(evento.value);
        }
    }

    onChangedShowWeekends(evento){
        if (evento){
            this.showHideWeekends.emit(evento.value);
        }
    }

    onChangedShowFeriados(evento){
        if (evento){
            this.showHideFeriados.emit(evento.value);
        }
    }

    onChangedSaltarFrancos(evento){
        if (evento){
            this.saltarFrancos.emit(evento.value);
        }
    }

}
