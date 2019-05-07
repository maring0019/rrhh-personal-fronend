import { Component, Input } from '@angular/core';
import { Router} from '@angular/router';
import {Location} from '@angular/common';

import { Agente } from 'src/app/models/Agente';
import { Direccion } from 'src/app/models/Direccion';
import { Contacto } from 'src/app/models/Contacto';
import { Educacion } from 'src/app/models/Educacion';


@Component({
  selector: 'app-agente-detalle',
  templateUrl: './agente-detalle.html',
  styleUrls: ['./agente-detalle.scss']
})
export class AgenteDetalleComponent {
    @Input() agente: Agente;
    @Input() direccion: Direccion;
    @Input() contactos: Contacto[];
    @Input() educacion: Educacion[];

    fotoAgente:any;

    constructor(private router: Router,
                private _location: Location)
                { }


    gotoAgente() {
        if (this.agente.id){
            this.router.navigate(['/agentes/registro' , { id: this.agente.id }]);
        }
        else{
            this.router.navigate(['/agentes/registro']);
        }
    }

    volverInicio() {
        this._location.back()
    }

}
