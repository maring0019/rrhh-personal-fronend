export class Contacto {
    _id: String;
    tipo: String;
    valor: String;

    constructor(contacto?)
    {
        contacto = contacto || {};
        this._id = contacto._id? contacto._id : undefined;
        this.tipo = contacto.tipo? ((typeof contacto.tipo === 'string') ? contacto.tipo : contacto.tipo.id) : null;
        this.valor = contacto.valor || '';
    }
}
