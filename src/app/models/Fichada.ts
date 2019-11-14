export class Fichada {
    id: String;
    agente: { 
        id: String,
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
        this.id = fichada.id || null;
        this.agente = fichada.agente || null;
        this.entrada = fichada.entrada;
        this.salida = fichada.salida;
        this.horasTrabajadas = fichada.horasTrabajadas
    }
}


