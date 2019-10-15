import { Servicio } from './Servicio';
import { ParteEstado } from './ParteEstado';
import { ParteAgente } from './ParteAgente';


export class Parte {

    id: String;
    fecha: Date;
    procesado: Boolean;
    estado: ParteEstado;
    fechaEntrega: Date;
    servicio: Servicio;
    partesAgentes: ParteAgente[];
    
    constructor(parte?)
    {
        parte = parte || {};
        this.id = parte.id || null;
        this.fecha = parte.fecha;
        this.procesado = parte.procesado;
        this.estado = new ParteEstado(parte.estado);
        this.servicio = new Servicio(parte.estado);
        this.partesAgentes = [];
        if (parte.partesAgentes && parte.partesAgentes.length){
            parte.partesAgentes.forEach(p => {
                this.partesAgentes.push(new ParteAgente(p));
            });
        }
    }
}


