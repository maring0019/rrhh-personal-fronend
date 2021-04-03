import { Agrupamiento } from './Agrupamiento';
import { Servicio } from './Servicio';

export class GuardiaLote {
    _id?: String;
    numero: String;
    servicio: Servicio;
    tipoGuardia: String;
    categoria: Agrupamiento;

    get nombre(){
        return `Lote Nro: ${this.numero}   |   Servicio: ${this.servicio.nombre}   |   
                Tipo de Guardia: ${this.tipoGuardia.toUpperCase()}   |   Categoria: ${this.categoria.nombre.toUpperCase()}`
        
    }

    constructor(lote?)
    {
        lote = lote || {};
        this._id = lote._id;
        this.numero = lote.numero || null;
        this.servicio = lote.servicio? new Servicio(lote.servicio): null;
        this.tipoGuardia = lote.tipoGuardia?
            ((typeof lote.tipoGuardia === 'string') ? lote.tipoGuardia : lote.tipoGuardia.id) : null;
        this.categoria = lote.categoria? new Agrupamiento(lote.categoria): null;
    }
}