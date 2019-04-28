export class Educacion {
    tipoEducacion: String;
    titulo: String;
    constructor(estudio?)
    {
        estudio = estudio || {};
        this.tipoEducacion = estudio.tipoEducacion?
            ((typeof estudio.tipoEducacion === 'string') ? estudio.tipoEducacion : estudio.tipoEducacion.id) : null;
        this.titulo = estudio.titulo || '';

    }
}
