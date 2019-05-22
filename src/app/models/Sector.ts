export class Sector {
    id: String;
    nombre: string;
    jefe: String;
    servicio: String;
    ubicacion: Number;
    nombreViejo: String;

    constructor(sector?)
    {
        sector = sector || {};
        this.id = sector.id || null;
        this.nombre = sector.nombre || '';
        this.jefe = sector.jefe || null;
        this.servicio = sector.servicio || '';
        this.ubicacion = sector.ubicacion;
        this.nombreViejo = sector.nombreViejo || '';
    }
}