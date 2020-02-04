import { Provincia } from './Provincia';

export class Localidad {
    _id: String;
    nombre: String;
    provincia: Provincia;

    constructor(localidad?){
        localidad = localidad || {};
        this._id = localidad._id || null;
        this.nombre = localidad.nombre || '';
        this.provincia = localidad.provincia || null;
    }
}