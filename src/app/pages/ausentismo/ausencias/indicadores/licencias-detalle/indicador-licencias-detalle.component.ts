import { Component, Input } from '@angular/core';

import { Agente } from 'src/app/models/Agente';
import { AusentismoService } from 'src/app/services/ausentismo.service';


@Component({
    selector: 'app-indicador-licencias-detalle',
    templateUrl: 'indicador-licencias-detalle.html'
})
export class IndicadorLicenciasDetalleComponent {

    @Input()
    set agente(value: Agente) {
        this.initIndicadores(value);
    }
    
    public indicadores;

    constructor(private ausentismoService:AusentismoService){}

    initIndicadores(agente){
        this.ausentismoService.getLicenciasByAgente(agente.id)
            .subscribe( data => this.indicadores = data);
    }
}