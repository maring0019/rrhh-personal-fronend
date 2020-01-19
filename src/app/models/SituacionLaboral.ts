import { Cargo } from './Cargo';
import { Regimen } from './Regimen';
import { TipoSituacion } from './TipoSituacion';
import { NormaLegal } from './NormaLegal';


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
    situacion: TipoSituacion;
    cargo: Cargo;
    regimen: Regimen;

    constructor(sl?){
        sl = sl || {};
        this.fechaIngresoEstado = sl.fechaIngresoEstado;
        this.fechaIngresoHospital = sl.fechaIngresoHospital;
        this.antiguedadVacaciones = sl.antiguedadVacaciones;
        this.antiguedadPago = sl.antiguedadPago;
        this.codigoFichado = sl.codigoFichado || '';
        this.exceptuadoFichado = sl.exceptuadoFichado;
        this.trabajaEnHospital = sl.trabajaEnHospital;
        this.trasladoDesde = sl.trasladoDesde || '';
        this.lugarPago = sl.lugarPago || '';
        this.normaLegal = new NormaLegal(sl.normaLegal);
        this.situacion = new TipoSituacion(sl.situacion);
        this.cargo = new Cargo(sl.cargo);
        this.regimen = new Regimen(sl.regimen);
    }
}