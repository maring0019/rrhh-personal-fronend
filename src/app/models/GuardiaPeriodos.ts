export class GuardiaPeriodo {
    id: String;
    fechaDesde: Date;
    fechaHasta: Date;
    nombre: String;

    constructor(periodo?)
    {
        periodo = periodo || {};
        this.id = periodo.id || null;
        this.fechaDesde = periodo.fechaDesde || null;
        this.fechaHasta = periodo.fechaHasta || null;
        this.nombre = periodo.nombre || '';
    }
}

