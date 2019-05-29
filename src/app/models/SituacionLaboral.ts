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
        this.fechaIngresoEstado = this.situacion? this.situacion.situacionFechaIngresoEstado : null;
        this.fechaIngresoHospital = this.situacion? this.situacion.situacionFechaIngresoHospital : null;
        this.antiguedadVacaciones = this.situacion? this.situacion.antiguedadVacaciones : null;
        this.antiguedadPago = this.situacion? this.situacion.antiguedadPago : null;

        this.tipoNormaLegal = sl.tipoNormaLegal || null;
        this.numeroNormaLegal = sl.numeroNormaLegal || '';
        this.fechaNormaLegal = sl.fechaNormaLegal;
        
        this.cargo = new Cargo(sl.cargo);
        this.regimen = new Regimen(sl.regimen);
        this.inactivo = sl.inactivo;
    }
}