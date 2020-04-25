import { localDate } from 'src/app/utils/dates';

export class Feriado {
    _id: String;
    fecha: Date;
    descripcion: String;

    constructor(feriado?){
        feriado = feriado || {};
        this._id = feriado._id || null;
        this.fecha = localDate(feriado.fecha);
        this.descripcion = feriado.descripcion || '';
    }
}

