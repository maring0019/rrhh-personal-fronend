import { Component, OnInit, Input } from '@angular/core';

import { AusenciaPeriodo } from 'src/app/models/AusenciaPeriodo';
import { Agente } from 'src/app/models/Agente';


@Component({
    selector: 'app-ausencias-search',
    templateUrl: 'ausencias-search.html'
})

export class AusenciasSearchComponent implements OnInit {
    @Input() agente: Agente;
    
    
    ausencias:AusenciaPeriodo[];
    ausenciasSeleccionado: AusenciaPeriodo;
    searching = false;
    
    public ngOnInit() {
        this.ausencias = null;
    }

    public hoverAusencias(obj:any){
        console.log(obj);
    }

    public seleccionarAusencias(obj:any){
        this.ausenciasSeleccionado = obj; //new Ausencias(obj);
    }

    public showResultados(obj:any){
        this.searching = false;
        this.ausencias = obj;
        this.resetAusenciasSeleccionado();
    }

    public clearResultados(event:any){
        this.searching = false;
        this.ausencias = null;
        this.resetAusenciasSeleccionado();
    }

    waitingResultados(event:any){
        console.log('Evento comienzo busqueda!!');
        this.searching = true;
        this.resetAusenciasSeleccionado();
    }

    resetAusenciasSeleccionado(){
        this.ausenciasSeleccionado = null;
    }
}