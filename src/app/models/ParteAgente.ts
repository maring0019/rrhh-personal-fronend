import { ParteJustificacion } from './ParteJustificacion';

export class ParteAgente {
    id: String;
    agente: { 
        id: String,
        nombre: String,
        apellido: String
    };
    fecha: Date;
    fichadas: {
        entrada: Date,
        salida: Date,
        horasTrabajadas: String // milisegundos
    };
    ausencia: {
        articulo: { 
            id: String,
            codigo: String,
            descripcion: String
        }
    };
    justificacion: ParteJustificacion;
    observaciones: String;
    
    
    constructor(parte?)
    {
        parte = parte || {};
        this.id = parte.id || null;
        this.agente = parte.agente || null;
        this.fichadas = parte.fichadas || null;
        this.ausencia = parte.ausencia || null;
        this.justificacion = parte.justificacion || null;
        this.observaciones = parte.observaciones || '';
    }
}


