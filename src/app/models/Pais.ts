export class Pais {
    _id: String;
    nombre: String;
    gentilicio: String;

    constructor(pais?){
        pais = pais || {};
        this._id = pais._id || null;
        this.nombre = pais.nombre || '';
        this.gentilicio = pais.gentilicio || '';
    }
}