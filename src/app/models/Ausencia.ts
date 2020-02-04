export class Ausencia {
    _id: String;
    agente: {
        _id: String;
    };
    fecha: Date;
    articulo: {
        _id: String,
        codigo: String
    };
    observacion: String;
    // adicional: String;
    // extra: String;
    // adjuntos: Array,
    // certificado: CertificadoSchema
}
