export class Contacto {
    tipo: String;
    valor: String;
    ranking: Number;
    activo: Boolean;
    ultimaActualizacion: Date;

    constructor(contacto?)
    {
        contacto = contacto || {};
        this.tipo = contacto.tipo? ((typeof contacto.tipo === 'string') ? contacto.tipo : contacto.tipo.id) : null;
        this.valor = contacto.valor || '';
        this.ranking = contacto.ranking || '';
        this.activo = contacto.activo || true;
        this.ultimaActualizacion = contacto.ultimaActualizacion || '';
    }
}
