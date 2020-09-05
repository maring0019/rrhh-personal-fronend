import { ParteEstado } from "./ParteEstado";
import { ParteAgente } from "./ParteAgente";
import { localDate } from "src/app/utils/dates";
import { Ubicacion } from "src/app/models/Ubicacion";

export class Parte {
    _id: String;
    fecha: Date;
    procesado: Boolean;
    editadoPostProcesado: Boolean;
    novedades: Boolean;
    estado: ParteEstado;
    fechaEntrega: Date;
    ubicacion: Ubicacion;
    partesAgentes: ParteAgente[];

    constructor(parte?) {
        parte = parte || {};
        this._id = parte._id;
        this.fecha = localDate(parte.fecha);
        this.procesado = parte.procesado;
        this.editadoPostProcesado = parte.editadoPostProcesado;
        this.novedades = parte.novedades;
        this.estado = parte.estado || null;
        this.ubicacion = parte.ubicacion
            ? new Ubicacion(parte.ubicacion)
            : null;
        this.partesAgentes = [];
        if (parte.partesAgentes && parte.partesAgentes.length) {
            parte.partesAgentes.forEach((p) => {
                this.partesAgentes.push(new ParteAgente(p));
            });
        }
    }
}
