export class Adjunto {
    _id: String;
    object: { 
        _id: String
    };
    updatedAt: Date;
    usuario: any;
    titulo: String;
    detalle: String;

    constructor(adjunto?){
        adjunto = adjunto || {};
        this._id = adjunto._id || null;
        this.object = adjunto.object || null;
        this.updatedAt = adjunto.updatedAt;
        this.usuario = adjunto.usuario || null;
        this.titulo = adjunto.titulo || '';
        this.detalle = adjunto.detalle || '';
    }
}

