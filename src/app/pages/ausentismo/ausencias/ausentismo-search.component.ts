import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AgenteService } from 'src/app/services/agente.service';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { Agente } from 'src/app/models/Agente';
import { IAusenciaEvento } from 'src/app/models/IAusenciaEvento';
import { DateRangeSelection } from 'src/app/pages/ausentismo/calendar/agente-calendar.component';
import { CalendarRangeSelectorService } from 'src/app/services/calendar-range-selector.service';



@Component({
    selector: 'app-ausentismo-search',
    templateUrl: 'ausentismo-search.html'
})

export class AusentismoSearchComponent implements OnInit {
    @Output() data: EventEmitter<Ausentismo[]> = new EventEmitter<Ausentismo[]>();
    @Output() ausentismoSelected: EventEmitter<Ausentismo> = new EventEmitter<Ausentismo>();

    agente:Agente;
    ausentismoSeleccionado: Ausentismo;
    dateRangeSelection: DateRangeSelection;
    ausentismos:Ausentismo[];
    searching = true;

    constructor(
        private agenteService:AgenteService,
        private rangeSelectorService: CalendarRangeSelectorService,
        private router:Router,
        private route: ActivatedRoute){}
    
    public ngOnInit() {
        this.route.parent.params.subscribe(
            params =>{
                const agenteID = params['agenteId'];
                if (agenteID){
                    this.agenteService.getByID(agenteID).subscribe((data) => {
                        if (data){
                            this.agente = new Agente(data);
                        }
                    });
                }
                else{
                    console.log('No se pudo recuperar el agenteID de los parametros')
                }
            }
        );
    }

    public hoverAusentismo(obj:any){
        console.log(obj);
    }

    public seleccionarAusentismo(obj?:any){
        if (obj){
            if (this.ausentismoSeleccionado == obj){
                this.ausentismoSeleccionado = null;
                this.dateRangeSelection = null;
            }
            else{
                this.ausentismoSeleccionado = obj;
                this.dateRangeSelection = {
                    fechaDesde: this.ausentismoSeleccionado.fechaDesde,
                    fechaHasta: this.ausentismoSeleccionado.fechaHasta
                }
            }
        }
        else{
            this.dateRangeSelection = null;
        }        
        // this.ausentismoSelected.emit(this.ausentismoSeleccionado);
        this.rangeSelectorService.setState(this.dateRangeSelection);
    }

    public editarAusentismo(ausentismo){
        this.router.navigateByUrl(`/agentes/${this.agente.id}/ausencias/${ausentismo.id}/editar`);
    }

    public showResultados(objs:any){
        this.searching = false;
        this.data.emit(objs);
        this.ausentismos = objs;
        this.seleccionarAusentismo();
    }

    public clearResultados(event:any){
        this.searching = false;
        this.data.emit(null);
        this.ausentismos = null;
        this.seleccionarAusentismo();
    }

    waitingResultados(event:any){
        this.searching = true;
        this.seleccionarAusentismo();
    }
}