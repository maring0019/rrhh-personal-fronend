import { ParteJustificacion } from './ParteJustificacion';

export class ParteAgente {
    id: String;
    parte: { 
        id: String
    };
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
    
    
    constructor(parteAgente?)
    {
        parteAgente = parteAgente || {};
        this.id = parteAgente.id || null;
        this.parte = parteAgente.parte || null;
        this.agente = parteAgente.agente || null;
        this.fichadas = parteAgente.fichadas || null;
        this.ausencia = parteAgente.ausencia || null;
        this.justificacion = parteAgente.justificacion || null;
        this.observaciones = parteAgente.observaciones || '';
    }
}


