export class Contacto {
    tipo: String;
    valor: String;
    activo: Boolean;

    constructor(contacto?)
    {
        contacto = contacto || {};
        this.tipo = contacto.tipo? ((typeof contacto.tipo === 'string') ? contacto.tipo : contacto.tipo.id) : null;
        this.valor = contacto.valor || '';
        this.activo = contacto.activo || true;
    }
}
