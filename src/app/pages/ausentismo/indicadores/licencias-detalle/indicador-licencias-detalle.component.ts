import { Component, Input } from '@angular/core';

import { Agente } from 'src/app/models/Agente';
import { Router } from '@angular/router';
import { IndicadorLicenciaService } from 'src/app/services/indicador-licencia.service';


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

    constructor(
        private indicadorLicenciaService: IndicadorLicenciaService,
        private router: Router
        ){}

    initIndicadores(agente:Agente){
        this.indicadorLicenciaService.getLicenciasByAgente(agente._id)
            .subscribe( data => this.indicadores = data);
    }

    public onItemEdit(item){
        this.router.navigate(['configuracion','licencia-periodos','editar', item._id]);
    }

    public licenciasAsignadas(item){
        return item.totales? item.totales:0;
    }

    public licenciasTomadas(item){
        return item.ejecutadas? item.ejecutadas:0;
    }

    public licenciasDisponibles(item){
        return this.licenciasAsignadas(item) - this.licenciasTomadas(item);
    }
}