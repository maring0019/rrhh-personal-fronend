import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-header-calendar',
    templateUrl: 'header-calendar.html'
})
export class HeadCalendarComponent implements OnInit {
    @Output() changedDate: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() showHideWeekends: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    @Output() showHideFeriados: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    
    fechaSeleccion:Date;
    showWeekends:Boolean = true;
    showFeriados:Boolean = true;
    agenteID:String;

    constructor(
        private route: ActivatedRoute,
        private router:Router){}

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

    onCargarAusentismo(){
        this.router.navigateByUrl(`/agentes/${this.agenteID}/ausencias/agregar`);
    }
}
