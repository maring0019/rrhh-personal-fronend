import { Servicio } from "./Servicio";
import { Agrupamiento } from "./Agrupamiento";
import { Puesto } from "./Puesto";
import { SubPuesto } from "./Subpuesto";
import { Sector } from "./Sector";
import { Ubicacion } from "src/app/models/Ubicacion";

export class Cargo {
    _id: String;
    agrupamiento: Agrupamiento;
    puesto: Puesto; // Alias Agrupamiento (otro agrupamiento)
    subpuesto: SubPuesto; // Alias Funcion
    sector: Sector; // Alias Lugar de Trabajo
    servicio: Servicio;
    ubicacion: Ubicacion;
    observaciones: String;
    inactivo: Boolean;
    esJefe: Boolean;
    jefeUbicaciones: Ubicacion[];

    constructor(cargo?) {
        cargo = cargo || {};
        this._id = cargo._id || null;
        this.agrupamiento = cargo.agrupamiento || null;
        this.puesto = cargo.puesto || null;
        this.subpuesto = cargo.subpuesto || null;
        this.sector = cargo.sector || null;
        this.observaciones = cargo.observaciones || "";
        this.servicio = cargo.servicio || null;
        this.ubicacion = cargo.ubicacion || null;
        this.inactivo = cargo.inactivo;
        this.esJefe = cargo.esJefe;
        this.jefeUbicaciones = [];
        if (cargo.jefeUbicaciones) {
            for (const ubi of cargo.jefeUbicaciones) {
                this.jefeUbicaciones.push(new Ubicacion(ubi));
            }
        }
    }
}
