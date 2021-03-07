import { Component, Input } from '@angular/core';

import { Agente } from 'src/app/models/Agente';
import { IndicadorLicenciaService } from 'src/app/services/indicador-licencia.service';

@Component({
    selector: 'app-indicador-licencias',
    templateUrl: 'indicador-licencias.html',
    styleUrls: ['./indicador-licencias.scss']
})
export class IndicadorLicenciasComponent {

    @Input()
    set agente(value: Agente) {
        this.initIndicadores(value);
    }
    
    public indicadores = [];

    constructor(private indicadorLicenciaService: IndicadorLicenciaService){}

    
    initIndicadores(agente:Agente){
        this.indicadorLicenciaService.getLicenciasTotales(agente._id).subscribe((data) => {
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

}