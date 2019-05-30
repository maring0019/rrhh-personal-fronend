import { Pais } from './Pais';

export class Provincia {
    id: String;
    nombre: String;
    pais: Pais;

    constructor(provincia?){
        provincia = provincia || {};
        this.id = provincia.id || null;
        this.nombre = provincia.nombre || '';
        this.pais = provincia.pais || null;
    }
}