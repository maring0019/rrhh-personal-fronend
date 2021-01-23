import { Component, Input } from '@angular/core';

import { Agente } from 'src/app/models/Agente';
import { AusentismoService } from 'src/app/services/ausentismo.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-indicador-licencias-detalle',
    templateUrl: 'indicador-licencias-detalle.html'
})
export class IndicadorLicenciasDetalleComponent {

    @Input()
    set agente(value: Agente) {
        this.initIndicadores(value);
    }
    
    @Input() editable:Boolean = false;
    
    public indicadores;

    constructor(private ausentismoService:AusentismoService, private router: Router){}

    initIndicadores(agente:Agente){
        this.ausentismoService.getLicenciasByAgente(agente._id)
            .subscribe( data => this.indicadores = data);
    }

    public onItemEdit(item){
        this.router.navigate(['configuracion','licencia-periodos','editar', item._id]);
    }
}