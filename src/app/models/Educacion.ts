export class Educacion {
    _id: string;
    tipoEducacion: String;
    titulo: String;
    
    constructor(estudio?)
    {
        estudio = estudio || {};
        this._id = estudio._id || null;
        this.tipoEducacion = estudio.tipoEducacion?
            ((typeof estudio.tipoEducacion === 'string') ? estudio.tipoEducacion : estudio.tipoEducacion._id) : null;
        this.titulo = estudio.titulo || '';

    }
}
