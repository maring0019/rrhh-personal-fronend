import { Component, OnInit } from '@angular/core';
import { Agente } from 'src/app/models/Agente';


@Component({
    selector: 'app-agente-search',
    templateUrl: 'agente-search.html',
    // styleUrls: ['agente-busqueda.scss']
})

export class AgenteSearchComponent implements OnInit {

    agentes:Agente[];
    agenteSeleccionado: Agente;
    searching = false;
    
    public ngOnInit() {
        this.agentes = null;
    }

    hoverAgente(obj:any){
        console.log(obj);
    }

    public seleccionarAgente(obj:any){
        this.agenteSeleccionado = obj; //new Agente(obj);
    }

    showResultados(obj:any){
        this.searching = false;
        this.agentes = obj;
        this.resetAgenteSeleccionado();
    }

    clearResultados(event:any){
        this.searching = false;
        this.agentes = null;
        this.resetAgenteSeleccionado();
    }

    waitingResultados(event:any){
        this.searching = true;
        this.resetAgenteSeleccionado();
    }

    resetAgenteSeleccionado(){
        this.agenteSeleccionado = null;
    }
}