import { Component, Input } from '@angular/core';
import { Agente } from 'src/app/models/Agente';

@Component({
    selector: 'app-agente-detalle-header',
    templateUrl: './agente-detalle-header.html',
    styleUrls: ['./agente-detalle-header.scss']
})
export class AgenteDetalleHeaderComponent{
    @Input() agente: Agente;
    @Input() foto: any;

}