import { Component, Input, Output, EventEmitter} from '@angular/core';
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
    @Input() foto: any;
    @Input() direccion: Direccion;
    @Input() contactos: Contacto[];
    @Input() educacion: Educacion[];
    @Input() situacion: Situacion;
    @Input() cargo: Cargo;
    @Input() regimen: Regimen;

    @Output() onClose:EventEmitter<any> = new EventEmitter<any>();


    constructor(private router: Router)
                { }
    

    gotoAgente() {
        if (this.agente._id){
            this.router.navigate(['/agentes/registro' , { id: this.agente._id }]);
        }
        else{
            this.router.navigate(['/agentes/registro']);
        }
    }

    onCerrar(event){
        this.agente = null;
        this.onClose.emit();
    }

}
