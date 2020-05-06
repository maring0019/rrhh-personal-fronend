import { NormaLegal } from 'src/app/models/NormaLegal';
import { CausaBaja } from 'src/app/models/CausaBaja';
import { localDate } from 'src/app/utils/dates';


export class HistoriaAgenteBaja {
    fecha: Date;
    motivo: CausaBaja;
    normaLegal: NormaLegal;

    constructor(baja?)
    {
        baja = baja || {};
        this.fecha = localDate(baja.fecha);
        this.motivo = baja.motivo || null;
        this.normaLegal = new NormaLegal(baja.normaLegal);
    }
}