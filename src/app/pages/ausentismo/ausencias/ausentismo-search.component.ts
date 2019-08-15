import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AgenteService } from 'src/app/services/agente.service';
import { CalendarStoreService } from '../../../stores/calendar.store.service';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { Agente } from 'src/app/models/Agente';

import { getTomorrow } from 'src/app/utils/dates';


@Component({
    selector: 'app-ausentismo-search',
    templateUrl: 'ausentismo-search.html',
    styleUrls: ['./ausentismo-search.scss']
})

export class AusentismoSearchComponent implements OnInit {
    @Output() data: EventEmitter<Ausentismo[]> = new EventEmitter<Ausentismo[]>();
    @Output() ausentismoSelected: EventEmitter<Ausentismo> = new EventEmitter<Ausentismo>();

    agente:Agente;
    ausentismoSeleccionado: Ausentismo;
    ausentismos:Ausentismo[];
    searching = true;

    // Harcodeo
    indicadores = [
        {
            numero : 45,
            detalle : 'Dias asignados'
        },
        {
            numero : 10,
            detalle : 'Dias tomados'
        },
        {
            numero : 35,
            detalle : 'Dias disponibles'
        }
    ]

    constructor(
        private agenteService:AgenteService,
        private calendarStoreService: CalendarStoreService,
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
        let dateRangeSelection:any;
        if (obj){
            if (this.ausentismoSeleccionado == obj){
                this.ausentismoSeleccionado = null;
                dateRangeSelection = null;
            }
            else{
                this.ausentismoSeleccionado = obj;
                dateRangeSelection = {
                    fechaDesde: this.ausentismoSeleccionado.fechaDesde,
                    fechaHasta: getTomorrow(this.ausentismoSeleccionado.fechaHasta)
                }
            }
        }
        else{
            dateRangeSelection = null;
        }
        console.log('Vamos a editar el range')        
        console.log(dateRangeSelection)
        this.calendarStoreService.selectionRange = dateRangeSelection;
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