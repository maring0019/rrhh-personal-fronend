export class CausaBaja {
    id: string;
    nombre: string;

    constructor(causa?)
    {
        causa = causa || {};
        this.id = causa.id || null;
        this.nombre = causa.nombre || '';
    }
}