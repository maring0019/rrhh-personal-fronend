import { IContacto } from './IContacto';
import { Direccion } from './Direccion';
import { IPais } from './IPais';
import { EstadoCivil, Sexo, Genero } from './enumerados';

// import { EstadoCivil } from './../utils/enumerados';

export class Agente {

    numero: String; // En el alta aun no esta disponible este dato
    tipoDocumento: String; // No deberia utilizarse mas. Solo DU
    documento: String;
    cuil: String;
    nombre: String;
    apellido: String;
    estadoCivil: EstadoCivil;
    nacionalidad: IPais;
    sexo: Sexo;
    genero: Genero;
    fechaNacimiento: Date;
    direccion: [Direccion];
    contacto: [IContacto];
    // educacion: [EducacionSchema];
    // especialidad: EspecialidadSchema; // TODO Ver especialidadSchema
    // situacion: SituacionEnPlantaSchema;
    // cargos: [CargoSchema];
    foto: String;
    codigoFichado: String;
    activo: Boolean

    constructor(agente?)
    {
        agente = agente || {};
        this.numero = agente.numero || '';
        this.documento = agente.documento || '';
        this.cuil = agente.cuil || '';
        this.nombre = agente.nombre || '';
        this.apellido = agente.apellido || '';
        this.estadoCivil = agente.estadoCivil? ((typeof agente.estadoCivil === 'string') ? agente.estadoCivil : agente.estadoCivil.id) : null;
        this.sexo = agente.sexo? ((typeof agente.sexo === 'string') ? agente.sexo : agente.sexo.id) : null;
        this.genero = agente.genero? ((typeof agente.genero === 'string') ? agente.genero : agente.genero.id) : null;
        this.fechaNacimiento = agente.fechaNacimiento;
        if (agente.direccion){
            agente.direccion.forEach(e => {
                this.direccion.push(new Direccion(e))
            });
        }
    }

    getDireccionActiva(): Direccion
    {
        if (this.direccion){
            return this.direccion.filter(x => x.activo)[0];
        }
        return
    }
}
