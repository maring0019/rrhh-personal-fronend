export class AusenciaPeriodo {
    agente: {
        id: String;
    };
    articulo: {
        id: String,
        codigo: String
    };
    fechaDesde: Date;
    fechaHasta:Date;
    cantidadDias: Number;
    observacion: String;
    adjuntos: Array<any>;
    // certificado: CertificadoSchema

    constructor(periodo?)
    {
        periodo = periodo || {};
        // this.id = agente.id || null;
        this.agente = periodo.agente || null;
        this.articulo = periodo.articulo || null;
        this.fechaDesde = periodo.fechaDesde;
        this.fechaHasta = periodo.fechaHasta;
        this.cantidadDias = periodo.cantidadDias;
        this.observacion = periodo.observacion || '';
        this.adjuntos = periodo.adjuntos;
    }
}

