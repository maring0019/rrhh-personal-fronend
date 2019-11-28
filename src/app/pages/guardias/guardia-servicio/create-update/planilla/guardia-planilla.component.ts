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

    public onClick(dia){
        console.log(dia);
    }
}