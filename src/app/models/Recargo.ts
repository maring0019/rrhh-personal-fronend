import { localDate } from '../utils/dates';
import { Ubicacion } from './Ubicacion';
import { RecargoTurno } from './RecargoTurno';
import { RecargoJustificacion } from './RecargoJustificacion';

export class ItemPlanilla {
    private _agenteID: String;
    fecha: Date;
    turno: RecargoTurno;
    justificacion: RecargoJustificacion;
    observaciones: String;

    constructor(agente, item?)
    {
        item = item || {};
        this._agenteID = agente._id;
        this.fecha = item.fecha? item.fecha : null;
        this.turno = item.turno? item.turno : null;
        this.justificacion = item.justificacion? item.justificacion : null;
        this.observaciones = item.observaciones;
    }
}


export class RecargoItemPlanilla {
    agente: {
        _id: String,
        nombre: String,
        apellido: String,
        numero: String
    };
    items: ItemPlanilla[]

    constructor(item?)
    {
        item = item || {};
        this.agente = item.agente? item.agente : null;
        this.items = [];
        if (item.items && item.items.length){
            item.items.forEach(elem => {
                this.items.push(new ItemPlanilla(this.agente, elem));
            });
        }      
    }
}

export class Recargo {
    _id: String;
    mes: Number;
    anio: Number;
    servicio: Ubicacion;
    planilla: RecargoItemPlanilla[];
    estado: String;
    responsableEntrega: {    // Agente Jefe de Servicio
        _id: String,
        nombre: String,
        apellido: String
    };
    validado: Boolean;
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
                this.planilla.push(new RecargoItemPlanilla(e));
            });
        }      
        this.estado = recargo.estado ;
        this.responsableEntrega = recargo.responsableEntrega;
        this.responsableProcesamiento = recargo.responsableProcesamiento;
    }
}