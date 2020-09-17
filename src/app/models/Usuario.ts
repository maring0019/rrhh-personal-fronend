export class Usuario {
    _id: string;
    id: string;
    nombre: string;
    apellido: string;
    documento: string;
    nombreCompleto: string;
    username: string;
    usuario: string;
    authMethod: string;
    activo: boolean;
    permisos: string[];
    roles: string[];

    constructor(usuario?) {
        usuario = usuario || {};
        this._id = usuario._id || null;
        this.nombre = usuario.nombre || "";
        this.apellido = usuario.apellido || "";
        this.documento = usuario.documento || "";
        this.authMethod = usuario.authMethod
            ? typeof usuario.authMethod === "string"
                ? usuario.authMethod
                : usuario.authMethod.id
            : null;
        this.activo = usuario.activo;
        this.permisos = usuario.permisos || [];
        this.roles = usuario.roles || [];
    }
}
