import { TipoNormaLegal } from './TipoNormaLegal';
import { Servicio } from './Servicio';

export class Cargo {

    tipoNormaLegal: TipoNormaLegal;
    numeroNormaLegal: String;
    fechaNormaLegal: Date;
    // agrupamiento: AGRUPAMIENTO, // TODO Es correcto este agrupamiento?
    
    // categoria: CategoriaSchema,
    // puestoTrabajo: PuestoSchema, // TODO Es el agrupamiento de la pantalla?
    // subPuestoTrabajo: SubPuestoSchema, // TODO Es la funcion de la pantalla?
    // lugarTrabajo: SectorSchema,
    servicio: Servicio;
    observaciones: String;
    inactivo: Boolean;

    constructor(cargo?)
    {
        cargo = cargo || {};
        this.tipoNormaLegal = cargo.tipoNormaLegal || null;
        this.numeroNormaLegal = cargo.numeroNormaLegal || '';
        this.fechaNormaLegal = cargo.fechaNormaLegal;
        this.observaciones = cargo.observaciones || '';
        this.servicio = new Servicio(cargo.servicio);
        this.inactivo = cargo.inactivo;
    }
}