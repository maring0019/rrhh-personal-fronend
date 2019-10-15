import { ParteJustificacion } from './ParteJustificacion';

export class ParteAgente {

    id: String;
    agente: { 
        id: String,
        nombre: String,
        apellido: String
    };
    fechaHoraEntrada: Date;
    fechaHoraSalida: Date;
    horasTrabajadas: String;
    articulo: { 
        id: String,
        codigo: String
    };
    justificacion: ParteJustificacion;
    
    
    constructor(parte?)
    {
        parte = parte || {};
        this.id = parte.id || null;
        this.agente = parte.agente || null;
        this.fechaHoraEntrada = parte.fechaHoraEntrada;
        this.fechaHoraSalida = parte.fechaHoraSalida;
        this.horasTrabajadas = parte.horasTrabajadas;
        this.articulo = parte.articulo || null;
        this.justificacion = new ParteJustificacion(parte.justificacion);
    }
}


