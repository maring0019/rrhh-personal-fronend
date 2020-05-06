import { CausaBaja } from 'src/app/models/CausaBaja';
import { NormaLegal } from 'src/app/models/NormaLegal';
import { Situacion } from 'src/app/models/Situacion';
import { Cargo } from 'src/app/models/Cargo';
import { Regimen } from 'src/app/models/Regimen';
import { localDate } from 'src/app/utils/dates';

export class HistoriaAgenteSituacion {
    fecha: Date;
    motivo: CausaBaja;
    normaLegal: NormaLegal;
    situacion: Situacion;
    cargo: Cargo;
    regimen: Regimen;

    constructor(situacion?)
    {
        situacion = situacion || {};
        this.fecha = localDate(situacion.fecha);
        this.motivo = situacion.motivo || null;
        this.normaLegal = new NormaLegal(situacion.normaLegal);
        this.situacion = new Situacion(situacion.situacion);
        this.cargo = new Cargo(situacion.cargo);
        this.regimen = new Regimen(situacion.regimen);
    }
}