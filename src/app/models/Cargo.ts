import { Servicio } from './Servicio';
import { Agrupamiento } from './Agrupamiento';
import { Puesto } from './Puesto';
import { SubPuesto } from './Subpuesto';
import { Sector } from './Sector';

export class Cargo {
    id: String;
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
        this.agrupamiento = cargo.agrupamiento || null;
        this.puesto = cargo.puesto || null;
        this.subpuesto = cargo.subpuesto || null;
        this.sector = cargo.sector || null;
        this.observaciones = cargo.observaciones || '';
        this.servicio = cargo.servicio || null;
        this.inactivo = cargo.inactivo;
    }
}