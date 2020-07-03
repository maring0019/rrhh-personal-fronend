import { Cargo } from './Cargo';
import { Regimen } from './Regimen';
import { NormaLegal } from './NormaLegal';
import { Situacion } from './Situacion';
import { localDate } from '../utils/dates';


export class SituacionLaboral {
    _id: String;
    fechaIngresoEstado: Date;
    fechaIngresoHospital: Date;
    antiguedadVacaciones: Date;
    antiguedadPago: Date;
    codigoFichado: String;
    exceptuadoFichado: Boolean;
    trabajaEnHospital: Boolean;
    trasladoDesde: String;
    lugarPago: String;
    normaLegal: NormaLegal;
    situacion: Situacion;
    cargo: Cargo;
    regimen: Regimen;
    fecha: Date;
    motivo: String;

    constructor(sl?){
        sl = sl || {};
        this._id = sl._id || null;
        this.fechaIngresoEstado = localDate(sl.fechaIngresoEstado);
        this.fechaIngresoHospital = localDate(sl.fechaIngresoHospital);
        this.antiguedadVacaciones = localDate(sl.antiguedadVacaciones);
        this.antiguedadPago = localDate(sl.antiguedadPago);
        this.codigoFichado = sl.codigoFichado || '';
        this.normaLegal = new NormaLegal(sl.normaLegal);
        this.situacion = new Situacion(sl.situacion);
        this.cargo = new Cargo(sl.cargo);
        this.regimen = new Regimen(sl.regimen);
        this.fecha = localDate(sl.fecha);
        this.motivo = sl.motivo || '';
    }
}