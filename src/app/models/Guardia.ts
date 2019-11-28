import { Agrupamiento } from './Agrupamiento';
import { Ubicacion } from './Ubicacion';
import { GuardiaPeriodo } from './GuardiaPeriodos';

class Guardiaplanilla {
    agente: {
        id: String,
        nombre: String,
        apellido: String
    }
    diasGuardia: Date[]
}

export class Guardia {
    id?: String;
    periodo: GuardiaPeriodo;
    servicio: Ubicacion;
    tipoGuardia: String;
    categoria: Agrupamiento;
    planilla: Guardiaplanilla[];
    estado: String;
    fechaEntrega: Date;
    responsableEntrega: { // Agente Jefe de Servicio
        id: String,
        nombre: String,
        apellido: String
    };
    validado: Boolean;
    responsableValidacion: { // Agente de Gestion de Personal
        id: String,
        nombre: String,
        apellido: String
    }; 
    fechaValidacion: Date;


    constructor(guardia?)
    {
        guardia = guardia || {};
        this.id = guardia.id || null;
        this.periodo = guardia.periodo? new GuardiaPeriodo(guardia.periodo): null;
        this.servicio = guardia.servicio? new Ubicacion(guardia.servicio): null;
        this.tipoGuardia = guardia.tipoGuardia?
            ((typeof guardia.tipoGuardia === 'string') ? guardia.tipoGuardia : guardia.tipoGuardia.id) : null;
        this.categoria = guardia.categoria? new Agrupamiento(guardia.categoria): null;
        this.planilla = guardia.planilla? guardia.planilla : [];
        this.estado = guardia.estado;
        this.fechaEntrega = guardia.fechaEntrega;
        this.responsableEntrega = guardia.responsableEntrega;
        this.validado = guardia.validado;
        this.responsableValidacion = guardia.responsableValidacion;
        this.fechaValidacion = guardia.fechaValidacion;
    }
}