import { localDate } from 'src/app/utils/dates';

export class Fichada {
    _id: String;
    agente: { 
        _id: String,
        nombre: String,
        apellido: String
    };
    fecha: Date;
    entrada: Date;
    salida: Date;
    horasTrabajadas: String // milisegundos
    
    constructor(fichada?)
    {
        fichada = fichada || {};
        this._id = fichada._id || null;
        this.agente = fichada.agente || null;
        this.fecha = localDate(fichada.fecha)
        this.entrada = fichada.entrada;
        this.salida = fichada.salida;
        this.horasTrabajadas = fichada.horasTrabajadas
    }
}


