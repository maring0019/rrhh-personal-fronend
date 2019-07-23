import { Ausencia } from './Ausencia';

export class Ausentismo {
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

    constructor(ausentismo?)
    {
        ausentismo = ausentismo || {};
        this.id = ausentismo.id || null;
        this.agente = ausentismo.agente || null;
        this.articulo = ausentismo.articulo || null;
        this.fechaDesde = ausentismo.fechaDesde;
        this.fechaHasta = ausentismo.fechaHasta;
        this.cantidadDias = ausentismo.cantidadDias;
        this.observacion = ausentismo.observacion || '';
        this.ausencias = ausentismo.ausencias || [];
        // this.ausencias = ausentismo.ausencias.length || [];
        this.adjuntos = ausentismo.adjuntos;
    }
}

