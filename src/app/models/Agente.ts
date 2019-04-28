
import { Direccion } from './Direccion';
import { Contacto } from './Contacto';
import { Educacion } from './Educacion';
import { IPais } from './IPais';
import { EstadoCivil, Sexo, Genero } from './enumerados';

// import { EstadoCivil } from './../utils/enumerados';

export class Agente {

    id: String;
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
    direccion: Direccion;
    contactos: Contacto[];
    educacion: Educacion[];
    // especialidad: EspecialidadSchema; // TODO Ver especialidadSchema
    // situacion: SituacionEnPlantaSchema;
    // cargos: [CargoSchema];
    foto: String;
    codigoFichado: String;
    activo: Boolean

    constructor(agente?)
    {
        agente = agente || {};
        this.id = agente.id || null;
        this.numero = agente.numero || '';
        this.documento = agente.documento || '';
        this.cuil = agente.cuil || '';
        this.nombre = agente.nombre || '';
        this.apellido = agente.apellido || '';
        this.estadoCivil = agente.estadoCivil? ((typeof agente.estadoCivil === 'string') ? agente.estadoCivil : agente.estadoCivil.id) : null;
        this.sexo = agente.sexo? ((typeof agente.sexo === 'string') ? agente.sexo : agente.sexo.id) : null;
        this.genero = agente.genero? ((typeof agente.genero === 'string') ? agente.genero : agente.genero.id) : null;
        this.fechaNacimiento = agente.fechaNacimiento;
        this.nacionalidad = agente.nacionalidad || null;
        this.direccion = new Direccion(agente.direccion);
        this.contactos = [];
        if (agente.contactos){
            agente.contactos.forEach(e => {
                this.contactos.push(new Contacto(e))
            });
        }
        this.educacion = [];
        if (agente.educacion){
            agente.educacion.forEach(e => {
                this.educacion.push(new Educacion(e))
            });
        }
    }

    // getDireccionActiva(): Direccion
    // {
    //     if (this.direccion){
    //         return this.direccion.filter(x => x.activo)[0];
    //     }
    //     return
    // }
}


// padron_provincia_marzo_2019.xlsx
// padron_afiliados_ATE.xlsx

// Se adjutan dos archivos en formato excel para comparar informacion entre ambos. Ambos
// archivos son padrones con informacion sobre afiliados obtenidos de diferentes fuentes.
// Identificar que afiliados tienen en comun ambos archivos, y que afiliados no estan en 
// uno u otro padron. Se requiere por lo tanto 3 listados de afiliados diferentes.

// Para el listado de afiliados en comun obtener datos personales, fecha alta


