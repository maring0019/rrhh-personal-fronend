import { ParteJustificacion } from './ParteJustificacion';

export class ParteAgente {
    _id: String;
    parte: { 
        _id: String
    };
    agente: { 
        _id: String,
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
            _id: String,
            codigo: String,
            descripcion: String
        }
    };
    justificacion: ParteJustificacion;
    observaciones: String;
    
    
    constructor(parteAgente?)
    {
        parteAgente = parteAgente || {};
        this._id = parteAgente._id;
        this.parte = parteAgente.parte || null;
        this.agente = parteAgente.agente || null;
        this.fecha = parteAgente.fecha;
        this.fichadas = parteAgente.fichadas || null;
        this.ausencia = parteAgente.ausencia || null;
        this.justificacion = parteAgente.justificacion || null;
        this.observaciones = parteAgente.observaciones || '';
    }
}


