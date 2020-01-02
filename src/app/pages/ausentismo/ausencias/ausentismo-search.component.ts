import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AgenteService } from 'src/app/services/agente.service';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { Agente } from 'src/app/models/Agente';


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

    constructor(
        private agenteService:AgenteService,
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

    public editarAusentismo(ausentismo){
        this.router.navigateByUrl(`/agentes/${this.agente.id}/ausencias/${ausentismo.id}/editar`);
    }

    public verIndicadores(){
        this.router.navigateByUrl(`/agentes/${this.agente.id}/ausencias/indicadores`);
    }

    public showResultados(objs:any){
        this.searching = false;
        this.data.emit(objs);
        this.ausentismos = objs;
    }

    public clearResultados(event:any){
        this.searching = false;
        this.data.emit(null);
        this.ausentismos = null;
    }

    waitingResultados(event:any){
        this.searching = true;
    }
}