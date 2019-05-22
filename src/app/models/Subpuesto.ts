export class SubPuesto {
    id: String;
    nombre: string;

    constructor(subpuesto?)
    {
        subpuesto = subpuesto || {};
        this.id = subpuesto.id || null;
        this.nombre = subpuesto.nombre || '';
    }
}