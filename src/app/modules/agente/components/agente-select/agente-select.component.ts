import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Agente } from 'src/app/models/Agente';


@Component({
    selector: 'app-agente-select',
    templateUrl: 'agente-select.html'
})
/**
 * Componente generico de busqueda y seleccion de agentes
 */
export class AgenteSelectComponent implements OnInit {

    @Input() searchParams: any = {};

    @Output() selected: EventEmitter<Agente> = new EventEmitter<Agente>();
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

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

    public onSelected(obj:any){
        this.selected.emit(obj);
    }

    public onCancel(){
        this.cancel.emit();
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

    
}