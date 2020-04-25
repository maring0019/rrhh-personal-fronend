import { TipoSituacion } from './TipoSituacion';
import { localDate } from 'src/app/utils/dates';


export class Situacion {
    tipoSituacion: TipoSituacion;
    fechaBajaProgramada: Date;
    lugarPago: String;
    exceptuadoFichado: Boolean;
    trabajaEnHospital: Boolean;
    trasladoDesde: String;

    constructor(situacion?)
    {
        situacion = situacion || {};
        this.tipoSituacion = situacion.tipoSituacion? new TipoSituacion(situacion.tipoSituacion):null;
        this.fechaBajaProgramada = localDate(situacion.fechaBajaProgramada);
        this.lugarPago= situacion.lugarPago || '';
        this.exceptuadoFichado = situacion.exceptuadoFichado || false;
        this.trabajaEnHospital = situacion.trabajaEnHospital || false;
        this.trasladoDesde = situacion.trasladoDesde || '';

    }
}