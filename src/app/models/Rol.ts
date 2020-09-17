export class Rol {
    _id: String;
    codename: string;
    nombre: String;
    descripcion: String;
    permisos: String[];
    hasPerm: Boolean;

    constructor(rol?) {
        rol = rol || {};
        this._id = rol._id || null;
        this.nombre = rol.nombre || "";
        this.codename = rol.codename || "";
        this.descripcion = rol.descripcion || "";
        this.permisos = rol.permisos || [];
    }
}
