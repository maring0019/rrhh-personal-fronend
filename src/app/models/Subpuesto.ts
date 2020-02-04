export class SubPuesto {
    _id: String;
    nombre: string;

    constructor(subpuesto?)
    {
        subpuesto = subpuesto || {};
        this._id = subpuesto._id || null;
        this.nombre = subpuesto.nombre || '';
    }
}