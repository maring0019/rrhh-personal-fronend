export class Educacion {
    tipo: String;
    titulo: String;
    constructor(estudio?)
    {
        estudio = estudio || {};
        this.tipo = estudio.tipo? ((typeof estudio.tipo === 'string') ? estudio.tipo : estudio.tipo.id) : null;
        this.titulo = estudio.titulo || '';

    }
}
