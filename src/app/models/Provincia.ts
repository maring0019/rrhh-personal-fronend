import { Pais } from './Pais';

export class Provincia {
    _id: String;
    nombre: String;
    pais: Pais;

    constructor(provincia?){
        provincia = provincia || {};
        this._id = provincia._id || null;
        this.nombre = provincia.nombre || '';
        this.pais = provincia.pais || null;
    }
}