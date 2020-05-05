import { NormaLegal } from 'src/app/models/NormaLegal';
import { localDate } from 'src/app/utils/dates';


export class ReactivacionAgente {
    fecha: Date;
    motivo: String;
    normaLegal: NormaLegal;

    constructor(reactivacion?)
    {
        reactivacion = reactivacion || {};
        this.fecha = localDate(reactivacion.fecha);
        this.motivo = reactivacion.motivo || null;
        this.normaLegal = new NormaLegal(reactivacion.normaLegal);
    }
}