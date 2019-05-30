export class Pais {
    id: String;
    nombre: String;
    gentilicio: String;

    constructor(pais?){
        pais = pais || {};
        this.id = pais.id || null;
        this.nombre = pais.nombre || '';
        this.gentilicio = pais.gentilicio || '';
    }
}