import { Component, OnInit, Input } from '@angular/core';
import { Agente } from 'src/app/models/Agente';
import { Ausencia } from 'src/app/models/Ausencia';
import { AgenteService } from 'src/app/services/agente.service';


@Component({
    selector: 'app-agente-calendar',
    templateUrl: 'agente-calendar.html',
    styleUrls: ['./agente-calendar.scss']
})

export class AgenteCalendarComponent implements OnInit {
    @Input() agente: Agente;
    ausencias: any[] = [
        { title: 'Art. 80', start: new Date(), allDay: true }
      ];

    constructor(
        private agenteService:AgenteService,
        ){}
    
    public ngOnInit() {
        this.agenteService.getAusencias(this.agente.id).subscribe((data) => {
            // this.ausencias = data;
            console.log(this.ausencias);
        });
    }
}
