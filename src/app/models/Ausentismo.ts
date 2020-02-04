import { Ausencia } from './Ausencia';

export class Ausentismo {
    _id: String;
    agente: {
        _id: String;
    };
    articulo: {
        _id: String,
        codigo: String,
        color: String
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
        this._id = ausentismo._id || null;
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

