import { localDate } from '../utils/dates';
import { Ubicacion } from './Ubicacion';

export class Recargo {
    _id: String;
    mes: Number;
    anio: Number;
    servicio: Ubicacion;
    planilla: any[];
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
        // if (recargo.planilla && recargo.planilla.length){
        //     recargo.planilla.forEach(e => {
        //         this.planilla.push(new ItemGuardiaPlanilla(e));
        //     });
        // }
        
        this.estado = recargo.estado ;
        this.responsableEntrega = recargo.responsableEntrega;
        this.responsableProcesamiento = recargo.responsableProcesamiento;
    }

}