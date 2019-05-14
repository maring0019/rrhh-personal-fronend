export class Educacion {
    id: string;
    tipoEducacion: String;
    titulo: String;
    
    constructor(estudio?)
    {
        estudio = estudio || {};
        this.id = estudio.id || null;
        this.tipoEducacion = estudio.tipoEducacion?
            ((typeof estudio.tipoEducacion === 'string') ? estudio.tipoEducacion : estudio.tipoEducacion.id) : null;
        this.titulo = estudio.titulo || '';

    }
}
