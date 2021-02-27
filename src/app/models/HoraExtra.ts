import { localDate } from '../utils/dates';
import { Ubicacion } from './Ubicacion';


export class HoraExtraItemPlanilla {
    agente: {
        _id: String,
        nombre: String,
        apellido: String,
        numero: String
    };
    horasSimples: number;
    horasSemiDobles: number;
    horasDobles: number;

    get horasTotales():number{
        const hsSimples = this.horasSimples? this.horasSimples:0;
        const hsDobles = this.horasDobles? this.horasDobles:0;
        const hsSemiDobles = this.horasSemiDobles? this.horasSemiDobles:0;
        return hsSimples + hsSemiDobles + hsDobles
    }

    constructor(item?)
    {
        item = item || {};
        this.agente = item.agente? item.agente : null;
        this.horasSimples = item.horasSimples? item.horasSimples : 0;
        this.horasSemiDobles = item.horasSemiDobles? item.horasSemiDobles : 0;
        this.horasDobles = item.horasDobles? item.horasDobles : 0;
    }
}

export class HoraExtra {
    _id: String;
    mes: {
        id: Number,
        nombre: String
    };
    anio: Number;
    servicio: Ubicacion;
    planilla: HoraExtraItemPlanilla[];
    estado: String;
    responsableEntrega: {    // Agente Jefe de Servicio
        _id: String,
        nombre: String,
        apellido: String
    };
    responsableProcesamiento: { // Agente de Gestion de Personal
        _id: String,
        nombre: String,
        apellido: String
    };
    get fechaHoraEntrega():Date{
        return localDate(this.fechaHoraEntrega);
    }

    get fechaHoraProcesamiento():Date{
        return localDate(this.fechaHoraProcesamiento);
    }

    constructor(recargo?)
    {
        recargo = recargo || {};
        this._id = recargo._id;
        this.mes = recargo.mes;
        this.anio = recargo.anio;
        this.servicio = recargo.servicio? new Ubicacion(recargo.servicio): null;
        this.planilla = [];
        if (recargo.planilla && recargo.planilla.length){
            recargo.planilla.forEach(e => {
                this.planilla.push(new HoraExtraItemPlanilla(e));
            });
        }      
        this.estado = recargo.estado ;
        this.responsableEntrega = recargo.responsableEntrega;
        this.responsableProcesamiento = recargo.responsableProcesamiento;
    }
}