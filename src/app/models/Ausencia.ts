export class Ausencia {
    id: String;
    agente: {
        id: String;
    };
    fecha: Date;
    articulo: {
        id: String,
        codigo: String
    };
    observacion: String;
    adicional: String;
    extra: String;
    // adjuntos: Array,
    // certificado: CertificadoSchema
}
