export class Feriado {
    id: String;
    fecha: Date;
    descripcion: String;

    constructor(feriado?){
        feriado = feriado || {};
        this.id = feriado.id || null;
        this.fecha = feriado.fecha;
        this.descripcion = feriado.descripcion || '';
    }
}

