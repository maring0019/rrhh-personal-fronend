export class Servicio {
    id: String;
    nombre: String;
    jefe: String; // ID de un Agente
    // departamento: DepartamentoSchema,
    ubicacion: Number;
    codigo: Number;
    nombreViejo: String;

    constructor(servicio?)
    {
        servicio = servicio || {};
        this.id = servicio.id || null;
        this.nombre = servicio.nombre || '';
        this.jefe = servicio.jefe || '';
        this.ubicacion = servicio.ubicacion || null;
        this.codigo = servicio.codigo || null;
        this.nombreViejo = servicio.nombreViejo || '';

    }
}