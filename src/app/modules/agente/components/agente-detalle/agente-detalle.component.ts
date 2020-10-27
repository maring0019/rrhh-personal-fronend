import { Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { Router} from '@angular/router';

import { AgenteService } from 'src/app/services/agente.service';

import { Agente } from 'src/app/models/Agente';
import { Direccion } from 'src/app/models/Direccion';
import { Contacto } from 'src/app/models/Contacto';
import { Educacion } from 'src/app/models/Educacion';
import { Situacion } from 'src/app/models/Situacion';
import { Cargo } from 'src/app/models/Cargo';
import { Regimen } from 'src/app/models/Regimen';
import { SituacionLaboral } from 'src/app/models/SituacionLaboral';
import { Nota } from 'src/app/models/Nota';


@Component({
  selector: 'app-agente-detalle',
  templateUrl: './agente-detalle.html',
  styleUrls: ['./agente-detalle.scss']
})
export class AgenteDetalleComponent implements OnChanges{
    @Input() showActions: Boolean;
    @Input() agente: Agente;
    @Input() foto: any;
    @Input() direccion: Direccion;
    @Input() contactos: Contacto[];
    @Input() educacion: Educacion[];
    @Input() situacion: Situacion;
    @Input() situacionLaboral: SituacionLaboral;
    @Input() cargo: Cargo;
    @Input() regimen: Regimen;
    @Input() notas: Nota[];

    @Output() onClose:EventEmitter<any> = new EventEmitter<any>();


    constructor(private router: Router, private agenteService:AgenteService){ }

    ngOnChanges(changes:any){
        if (changes['agente']){
            const agente = changes['agente'].currentValue;
            this.agenteService.getNotas(agente._id).subscribe(notas => this.notas = notas);
        } 
    }
    

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
