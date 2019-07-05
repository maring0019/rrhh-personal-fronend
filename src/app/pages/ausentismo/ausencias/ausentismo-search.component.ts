import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { Agente } from 'src/app/models/Agente';


@Component({
    selector: 'app-ausentismo-search',
    templateUrl: 'ausentismo-search.html'
})

export class AusentismoSearchComponent implements OnInit {
    @Input() agente: Agente;
    @Output() ausentismoSelected: EventEmitter<Ausentismo> = new EventEmitter<Ausentismo>();

    ausentismoSeleccionado: Ausentismo;

    ausentismos:Ausentismo[];
    searching = false;
    
    public ngOnInit() {
        this.ausentismos = null;
    }

    public hoverAusentismo(obj:any){
        console.log(obj);
    }

    public seleccionarAusentismo(obj?:any){
        if (this.ausentismoSeleccionado == obj){
            this.ausentismoSeleccionado = null;
        }
        else{
            this.ausentismoSeleccionado = obj;
        }
        this.ausentismoSelected.emit(this.ausentismoSeleccionado);
    }

    public showResultados(objs:any){
        this.searching = false;
        this.ausentismos = objs;
        this.seleccionarAusentismo();
    }

    public clearResultados(event:any){
        this.searching = false;
        this.ausentismos = null;
        this.seleccionarAusentismo();
    }

    waitingResultados(event:any){
        this.searching = true;
        this.seleccionarAusentismo();
    }
}