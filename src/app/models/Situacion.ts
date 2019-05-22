import { TipoSituacion } from './TipoSituacion';


export class Situacion {
    tipoSituacion: TipoSituacion;
    situacionLugarPago: String;
    situacionFechaIngresoEstado: Date;
    situacionFechaIngresoHospital: Date;
    antiguedadVacaciones: Date;
    antiguedadPago: Date;
    exceptuadoFichado: Boolean;
    trabajaEnHospital: Boolean;
    trasladoDesde: String;

    constructor(situacion?)
    {
        situacion = situacion || {};
        this.tipoSituacion = new TipoSituacion(situacion.tipoSituacion);
        this.situacionLugarPago= situacion.situacionLugarPago || '';
        this.situacionFechaIngresoEstado = situacion.situacionFechaIngresoEstado;
        this.situacionFechaIngresoHospital = situacion.situacionFechaIngresoHospital;
        this.antiguedadVacaciones = situacion.antiguedadVacaciones;
        this.antiguedadPago = situacion.antiguedadPago;
        this.exceptuadoFichado = situacion.exceptuadoFichado || false;
        this.trabajaEnHospital = situacion.trabajaEnHospital || false;
        this.trasladoDesde = situacion.trasladoDesde || '';

    }
}