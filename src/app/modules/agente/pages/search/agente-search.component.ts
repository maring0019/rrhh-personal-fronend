import { Component, OnInit } from '@angular/core';
import { Agente } from 'src/app/models/Agente';

@Component({
    selector: 'app-agente-search',
    templateUrl: 'agente-search.html',
    // styleUrls: ['agente-busqueda.scss']
})
export class AgenteSearchComponent implements OnInit {

    public agentes:Agente[];
    public agenteSeleccionado: Agente;
    public searching = false;
    public searched = false;
    public showMore: Boolean = false;
    private hiddenAgentes:Agente[]; 

    public ngOnInit() {
        this.agentes = [];
    }

    hoverAgente(obj:any){
        console.log(obj);
    }

    public seleccionarAgente(obj:any){
        this.agenteSeleccionado = obj; //new Agente(obj);
    }

    showResultados(items:any){
        this.searching = false;
        this.searched = true;
        this.hiddenAgentes = items ;
        this.showMoreResultados();   
        this.resetAgenteSeleccionado();
    }

    clearResultados(event:any){
        this.waitingResultados();
        this.searching = false;
        this.searched = false;
        
    }

    waitingResultados(event?:any){
        this.searching = true;
        this.agentes = []
        this.hiddenAgentes = [];
        this.showMore = false;
        this.resetAgenteSeleccionado();
    }

    showMoreResultados(e?:any){
        if (this.hiddenAgentes.length > 30){
            this.showMore = true;
            this.agentes = this.agentes.concat(this.hiddenAgentes.slice(0,29));
            this.hiddenAgentes = this.hiddenAgentes.slice(30);
        }
        else{
            this.showMore = false;
            this.agentes = this.agentes.concat(this.hiddenAgentes);
            this.hiddenAgentes = [];
        }   
    }

    resetAgenteSeleccionado(){
        this.agenteSeleccionado = null;
    }
}