import { TipoNormaLegal } from './TipoNormaLegal';
import { Servicio } from './Servicio';
import { Agrupamiento } from './Agrupamiento';
import { Puesto } from './Puesto';
import { SubPuesto } from './Subpuesto';
import { Sector } from './Sector';

export class Cargo {
    id: String;
    tipoNormaLegal: TipoNormaLegal;
    numeroNormaLegal: String;
    fechaNormaLegal: Date;
    agrupamiento: Agrupamiento;
    puesto: Puesto;              // Alias Agrupamiento (otro agrupamiento)
    subpuesto: SubPuesto;        // Alias Funcion
    sector: Sector;              // Alias Lugar de Trabajo
    servicio: Servicio;
    observaciones: String;
    inactivo: Boolean;

    constructor(cargo?)
    {
        cargo = cargo || {};
        this.id = cargo.id || null;
        this.tipoNormaLegal = cargo.tipoNormaLegal || null;
        this.numeroNormaLegal = cargo.numeroNormaLegal || '';
        this.fechaNormaLegal = cargo.fechaNormaLegal;
        this.agrupamiento = new Agrupamiento(cargo.agrupamiento);
        this.puesto = new Puesto(cargo.puesto);
        this.subpuesto = new SubPuesto(cargo.subpuesto);
        this.sector = new Sector(cargo.sector);
        this.observaciones = cargo.observaciones || '';
        this.servicio = new Servicio(cargo.servicio);
        this.inactivo = cargo.inactivo;
    }
}