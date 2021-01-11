import { Location } from '@angular/common';
import { Component,  OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Agente } from 'src/app/models/Agente';
import { AgenteService } from 'src/app/services/agente.service';

@Component({
    selector: 'app-ausentismo-indicadores',
    templateUrl: 'ausentismo-indicadores.html'
})
export class AusentismoIndicadoresComponent implements OnInit {

    @Input() agente:Agente;

    public indicadores = [];

    constructor(
        protected router:Router,
        private location: Location,
        private agenteService:AgenteService,
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
    
    initIndicadores(agente){
        this.agenteService.getLicenciasTotales(agente._id).subscribe((data) => {
            if (data && data.length){
                let ind = data[0];
                this.indicadores = [
                    {
                        numero : ind.totales,
                        detalle : 'Dias asignados'
                    },
                    {
                        numero : ind.ejecutadas,
                        detalle : 'Dias tomados'
                    },
                    {
                        numero : ind.totales - ind.ejecutadas,
                        detalle : 'Dias disponibles'
                    }
                ]
            }
        });
    }

    public onClose(){
        this.location.back();
    }

}