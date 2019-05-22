export class Agrupamiento {
    id: String;
    nombre: string;

    constructor(agrupamiento?)
    {
        agrupamiento = agrupamiento || {};
        this.id = agrupamiento.id || null;
        this.nombre = agrupamiento.nombre || '';
    }
}