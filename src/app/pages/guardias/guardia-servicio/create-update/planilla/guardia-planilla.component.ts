import { Component, OnInit, Input } from '@angular/core';

import { Guardia } from 'src/app/models/Guardia';

@Component({
    selector: 'app-guardia-planilla',
    templateUrl: './guardia-planilla.html',
    styleUrls: ['guardia-planilla.scss'],
  })
export class GuardiaPlanillaComponent implements OnInit {

    @Input() guardia: Guardia;

    ngOnInit(){

    }

    public onClick(dia, planillaIndex, diaIndex){
        // Habilitamos el click unicamente en las celdas de
        // la planilla que tengan dias validos
        if (dia){ 
            let diaGuardia = this.guardia.planilla[planillaIndex].diasGuardia[diaIndex];
            if (!diaGuardia){
                diaGuardia = { fecha: dia, diaCompleto: true } 
            }
            else{
                if (diaGuardia.diaCompleto){
                    diaGuardia.diaCompleto = false;
                }
                else{
                    diaGuardia = null;
                }
            }
            this.guardia.planilla[planillaIndex].diasGuardia[diaIndex] = diaGuardia;
        }
    }
}