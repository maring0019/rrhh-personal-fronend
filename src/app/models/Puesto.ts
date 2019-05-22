export class Puesto {
    id: String;
    nombre: string;

    constructor(puesto?)
    {
        puesto = puesto || {};
        this.id = puesto.id || null;
        this.nombre = puesto.nombre || '';
    }
}