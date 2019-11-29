import { Agrupamiento } from './Agrupamiento';
import { Ubicacion } from './Ubicacion';
import { GuardiaPeriodo } from './GuardiaPeriodos';


interface IDiaGuardia {
    fecha?: Date,
    diaCompleto?: Boolean
}

export class GuardiaPlanilla{
    agente: {
        id: String,
        nombre: String,
        apellido: String,
        numero: String
    }
    diasGuardia:  IDiaGuardia[]; // false si es medio dia

    get totalDias(){
        return this.diasGuardia
            .reduce((sum, dia) => {
                if (dia && dia.diaCompleto) return sum + 1;
                if (dia && !dia.diaCompleto) return sum + 0.5;
                return sum }
            , 0); // sum es el acumulador, se inicializa en 0
    }

    constructor(planilla?)
    {
        planilla = planilla || {};
        this.agente = planilla.agente? planilla.agente: null;
        this.diasGuardia = planilla.diasGuardia? planilla.diasGuardia: [];
    }
}

export class Guardia {
    id?: String;
    periodo: GuardiaPeriodo;
    servicio: Ubicacion;
    tipoGuardia: String;
    categoria: Agrupamiento;
    planilla: GuardiaPlanilla[];
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
        
        this.planilla = [];
        if (guardia.planilla && guardia.planilla.length){
            guardia.planilla.forEach(e => {
                this.planilla.push(new GuardiaPlanilla(e));
            });
        }
        
        this.estado = guardia.estado;
        this.fechaEntrega = guardia.fechaEntrega;
        this.responsableEntrega = guardia.responsableEntrega;
        this.validado = guardia.validado;
        this.responsableValidacion = guardia.responsableValidacion;
        this.fechaValidacion = guardia.fechaValidacion;
    }

}