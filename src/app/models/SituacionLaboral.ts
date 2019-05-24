import { TipoNormaLegal } from './TipoNormaLegal';
import { Situacion } from './Situacion';
import { Cargo } from './Cargo';
import { Regimen } from './Regimen';


export class SituacionLaboral {
    // Estos datos pertenecian al modelo Situacion. Ahora son 'globales'
    fechaIngresoEstado: Date;
    fechaIngresoHospital: Date;
    antiguedadVacaciones: Date;
    antiguedadPago: Date;
    // Estos datos pertenecian al modelo Cargo. Ahora son 'globales'
    tipoNormaLegal: TipoNormaLegal;
    numeroNormaLegal: String;
    fechaNormaLegal: Date;
    situacion: Situacion;
    cargo: Cargo;
    regimen: Regimen;
    inactivo:Boolean;

    constructor(sl?){
        sl = sl || {};
        this.situacion = new Situacion(sl.situacion);
        // Temporalmente cargamos esta info asi. Debe estar precargada
        this.fechaIngresoEstado = this.situacion.situacionFechaIngresoEstado;
        this.fechaIngresoHospital = this.situacion.situacionFechaIngresoHospital;
        this.antiguedadVacaciones = this.situacion.antiguedadVacaciones;
        this.antiguedadPago = this.situacion.antiguedadPago;

        this.tipoNormaLegal = new TipoNormaLegal(sl.tipoNormaLegal);
        this.numeroNormaLegal = sl.numeroNormaLegal;
        this.fechaNormaLegal = sl.fechaNormaLegal;
        
        this.cargo = new Cargo(sl.cargo);
        this.regimen = new Regimen(sl.regimen);
        this.inactivo = sl.inactivo;
    }
}