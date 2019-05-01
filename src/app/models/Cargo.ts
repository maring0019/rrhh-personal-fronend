import { TipoNormaLegal } from './TipoNormaLegal';

export class Cargo {

    tipoNormaLegal: TipoNormaLegal;
    numeroNormaLegal: String;
    fechaNormaLegal: Date;
    // agrupamiento: AGRUPAMIENTO, // TODO Es correcto este agrupamiento?
    
    // categoria: CategoriaSchema,
    // puestoTrabajo: PuestoSchema, // TODO Es el agrupamiento de la pantalla?
    // subPuestoTrabajo: SubPuestoSchema, // TODO Es la funcion de la pantalla?
    // lugarTrabajo: SectorSchema,
    // servicio: ServicioSchema,
    observaciones: String;

    constructor(cargo?)
    {
        cargo = cargo || {};
        this.tipoNormaLegal = cargo.tipoNormaLegal || null;
        this.numeroNormaLegal = cargo.numeroNormaLegal || '';
        this.fechaNormaLegal = cargo.fechaNormaLegal;
        this.observaciones = cargo.observaciones || '';
    }
}