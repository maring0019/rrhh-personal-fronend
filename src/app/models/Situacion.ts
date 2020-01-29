import { TipoSituacion } from './TipoSituacion';


export class Situacion {
    tipoSituacion: TipoSituacion;
    lugarPago: String;
    exceptuadoFichado: Boolean;
    trabajaEnHospital: Boolean;
    trasladoDesde: String;

    constructor(situacion?)
    {
        situacion = situacion || {};
        this.tipoSituacion = situacion.tipoSituacion? new TipoSituacion(situacion.tipoSituacion):null;
        this.lugarPago= situacion.lugarPago || '';
        this.exceptuadoFichado = situacion.exceptuadoFichado || false;
        this.trabajaEnHospital = situacion.trabajaEnHospital || false;
        this.trasladoDesde = situacion.trasladoDesde || '';

    }
}