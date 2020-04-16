import { Cargo } from './Cargo';
import { Regimen } from './Regimen';
import { NormaLegal } from './NormaLegal';
import { Situacion } from './Situacion';


export class SituacionLaboral {
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
        this.fechaIngresoEstado = sl.fechaIngresoEstado;
        this.fechaIngresoHospital = sl.fechaIngresoHospital;
        this.antiguedadVacaciones = sl.antiguedadVacaciones;
        this.antiguedadPago = sl.antiguedadPago;
        this.codigoFichado = sl.codigoFichado || '';
        this.normaLegal = new NormaLegal(sl.normaLegal);
        this.situacion = new Situacion(sl.situacion);
        this.cargo = new Cargo(sl.cargo);
        this.regimen = new Regimen(sl.regimen);
        this.fecha = sl.fecha;
        this.motivo = sl.motivo || '';
    }
}