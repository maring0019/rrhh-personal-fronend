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
    
    public ngOnInit() {
        this.agentes = [];
    }

    hoverAgente(obj:any){
        console.log('Hover Evento de Salida ');
        console.log(obj);
    }

    seleccionarAgente(obj:any){
        console.log(obj);
        this.agenteSeleccionado = obj;
    }

    verResultados(obj:any){
        this.agentes = obj;
        this.agenteSeleccionado = null;
    }
}