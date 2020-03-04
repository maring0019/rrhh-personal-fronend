export class RegimenHorario {
    _id: String;
    nombre: string;
    activo: Boolean;

    constructor(regimen?)
    {
        regimen = regimen || {};
        this._id = regimen._id || null;
        this.nombre = regimen.nombre || '';
        this.activo = regimen.activo;
    }
}