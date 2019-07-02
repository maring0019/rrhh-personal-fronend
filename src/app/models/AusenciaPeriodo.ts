import { Ausencia } from './Ausencia';

export class AusenciaPeriodo {
    id: String;
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
    ausencias: Ausencia[];
    adicional: String;
    extra: String;
    adjuntos: Array<any>;
    // certificado: CertificadoSchema

    constructor(periodo?)
    {
        periodo = periodo || {};
        this.id = periodo.id || null;
        this.agente = periodo.agente || null;
        this.articulo = periodo.articulo || null;
        this.fechaDesde = periodo.fechaDesde;
        this.fechaHasta = periodo.fechaHasta;
        this.cantidadDias = periodo.cantidadDias;
        this.observacion = periodo.observacion || '';
        this.ausencias = periodo.ausencias || [];
        // this.ausencias = periodo.ausencias.length || [];
        this.adjuntos = periodo.adjuntos;
    }
}

