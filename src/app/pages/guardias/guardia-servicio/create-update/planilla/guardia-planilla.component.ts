import { Component, OnInit, Input } from '@angular/core';

import { Guardia } from 'src/app/models/Guardia';

@Component({
    selector: 'app-guardia-planilla',
    templateUrl: './guardia-planilla.html',
    styleUrls: ['guardia-planilla.scss'],
  })
export class GuardiaPlanillaComponent implements OnInit {

    @Input() guardia: Guardia;
    @Input() editable: Boolean = true;

    ngOnInit(){

    }

    public onClick(dia, planillaIndex, diaIndex){
        // Habilitamos el click unicamente en las celdas de
        // la planilla que tengan dias validos
        if (this.editable && dia){ 
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

    onRemoveAgente(item, index){
        if (this.editable) this.guardia.planilla.splice(index, 1);
    }

}