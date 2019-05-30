import { Component, Input} from '@angular/core';
import { Router} from '@angular/router';

import { Agente } from 'src/app/models/Agente';
import { Direccion } from 'src/app/models/Direccion';
import { Contacto } from 'src/app/models/Contacto';
import { Educacion } from 'src/app/models/Educacion';
import { Situacion } from 'src/app/models/Situacion';
import { Cargo } from 'src/app/models/Cargo';
import { Regimen } from 'src/app/models/Regimen';


@Component({
  selector: 'app-agente-detalle',
  templateUrl: './agente-detalle.html',
  styleUrls: ['./agente-detalle.scss']
})
export class AgenteDetalleComponent{
    @Input() showActions: Boolean;
    @Input() agente: Agente;
    @Input() direccion: Direccion;
    @Input() contactos: Contacto[];
    @Input() educacion: Educacion[];
    @Input() situacion: Situacion;
    @Input() cargo: Cargo;
    @Input() regimen: Regimen;

    fotoAgente:any;

    constructor(private router: Router)
                { }
    

    gotoAgente() {
        if (this.agente.id){
            this.router.navigate(['/agentes/registro' , { id: this.agente.id }]);
        }
        else{
            this.router.navigate(['/agentes/registro']);
        }
    }

    onClose(event){
        this.agente = null;
    }

}
