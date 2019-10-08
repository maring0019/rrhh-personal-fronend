import { Servicio } from './Servicio';
import { ParteEstado } from './ParteEstado';


export class Parte {

    id: String;
    fecha: Date;
    procesado: Boolean;
    estado: ParteEstado;
    fechaEntrega: Date;
    servicio: Servicio;
    
    constructor(parte?)
    {
        parte = parte || {};
        this.id = parte.id || null;
        this.fecha = parte.fecha;
        this.procesado = parte.procesado;
        this.estado = new ParteEstado(parte.estado);
        this.servicio = new Servicio(parte.estado);
    }
}


