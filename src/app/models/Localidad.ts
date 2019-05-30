import { Provincia } from './Provincia';

export class Localidad {
    id: String;
    nombre: String;
    provincia: Provincia;

    constructor(localidad?){
        localidad = localidad || {};
        this.id = localidad.id || null;
        this.nombre = localidad.nombre || '';
        this.provincia = localidad.provincia || null;
    }
}