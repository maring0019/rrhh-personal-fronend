// Main Container Ausentismo
import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

import { Plex } from '@andes/plex';
import { AgenteService } from 'src/app/services/agente.service';
import { Agente } from 'src/app/models/Agente';

@Component({
    selector: 'app-agente-ausentismo',
    templateUrl: 'agente-ausentismo.html',
    styleUrls: ['./agente-ausentismo.scss']
})

export class AgenteAusentismoComponent implements OnInit {
    agente: Agente;
    
    constructor(
        private agenteService:AgenteService,
        private route: ActivatedRoute,
        private router: Router,
        public plex: Plex
        ){}
    
    
    public ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            const agenteID = params.get('id');
            if (agenteID){
                this.agenteService.getByID(agenteID).subscribe((data) => {
                    if (data){
                        this.agente = new Agente(data);
                    }else{
                        this.plex.info('info', 'El agente solicitado no existe!')
                            .then( e => {
                                this.volverInicio();
                        });
                    }
                });
            }
            else{
                this.volverInicio();
            }
        });
    }

    volverInicio() {
        this.router.navigate(['/agentes/busqueda'])
    }
}
