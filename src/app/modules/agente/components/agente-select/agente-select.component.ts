import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
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
    @Input() agentesExclude: any = [];

    @Output() selected: EventEmitter<Agente[]> = new EventEmitter<Agente[]>();
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

    private remoteItemFromList(list, item){
        return list.filter(elem => elem._id != item._id)
    }

    public onSelected(obj:any){
        this.agentes = this.remoteItemFromList(this.agentes, obj);
        this.selected.emit([obj]);

    }

    public onSelectAll(){
        this.selected.emit(this.agentes);
        this.onCancel();
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
        this.hiddenAgentes = this.filterAB(this.hiddenAgentes, this.agentesExclude);
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

    private filterAB(listA, listB){
        return listA.filter( x => !listB.filter( y => y._id === x._id).length);
    }

    
}