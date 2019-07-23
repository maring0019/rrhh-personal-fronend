import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-header-calendar',
    templateUrl: 'header-calendar.html'
})
export class HeadCalendarComponent implements OnInit {
    @Output() changedDate: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() changedWeekends: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    
    fechaSeleccion:Date;
    showWeekends:Boolean = true;
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
            this.changedWeekends.emit(evento.value);
        }
    }

    onCargarAusentismo(){
        this.router.navigateByUrl(`/agentes/${this.agenteID}/ausencias/agregar`);
    }
}
