import { Situacion } from './Situacion';


export class SituacionLaboral {
    situacion: Situacion;
    situacionLugarPago: String;
    situacionFechaIngresoEstado: Date;
    situacionFechaIngresoHospital: Date;
    antiguedadVacaciones: Date;
    antiguedadPago: Date;
    exceptuadoFichado: Boolean;
    trabajaEnHospital: Boolean;
    trasladoDesde: String;

    constructor(sl?)
    {
        sl = sl || {};
        this.situacion = sl.situacion;
        this.situacionLugarPago= sl.situacionLugarPago || '';
        this.situacionFechaIngresoEstado = sl.situacionFechaIngresoEstado;
        this.situacionFechaIngresoHospital = sl.situacionFechaIngresoHospital;
        this.antiguedadVacaciones = sl.antiguedadVacaciones;
        this.antiguedadPago = sl.antiguedadPago;
        this.exceptuadoFichado = sl.exceptuadoFichado || false;
        this.trabajaEnHospital = sl.trabajaEnHospital || false;
        this.trasladoDesde = sl.trasladoDesde || '';

    }
}