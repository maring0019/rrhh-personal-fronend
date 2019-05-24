export class RegimenHorario {
    id: String;
    nombre: string;

    constructor(regimem?)
    {
        regimem = regimem || {};
        this.id = regimem.id || null;
        this.nombre = regimem.nombre || '';
    }
}