import { Component, OnInit } from '@angular/core';
import { Agente } from 'src/app/models/Agente';

import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-agente-search',
    templateUrl: 'agente-search.html'
})
export class AgenteSearchComponent implements OnInit {

    constructor(private modalService: ModalService) {
    }

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
        this.agenteSeleccionado = null;
        this.showMoreResultados();   
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
        this.agenteSeleccionado = null;
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

    openModal(id: string) {
        this.modalService.open(id);
    }

    public onCerrarDetalle(){
        this.agenteSeleccionado = null;
    }

    public onChangeAgente(agente){
        console.log("Cambio el agente:", agente);
        this.agenteSeleccionado = {... agente};
    }
    
}