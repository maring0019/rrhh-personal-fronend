import { Servicio } from './Servicio';
import { ParteEstado } from './ParteEstado';
import { ParteAgente } from './ParteAgente';
import { localDate } from 'src/app/utils/dates';


export class Parte {

    _id: String;
    fecha: Date;
    procesado: Boolean;
    estado: ParteEstado;
    fechaEntrega: Date;
    ubicacion: Servicio;
    partesAgentes: ParteAgente[];
    
    constructor(parte?)
    {
        parte = parte || {};
        this._id = parte._id;
        this.fecha = localDate(parte.fecha);
        this.procesado = parte.procesado;
        this.estado = parte.estado || null;
        this.ubicacion = parte.ubicacion? new Servicio(parte.ubicacion): null;
        this.partesAgentes = [];
        if (parte.partesAgentes && parte.partesAgentes.length){
            parte.partesAgentes.forEach(p => {
                this.partesAgentes.push(new ParteAgente(p));
            });
        }
    }
}


