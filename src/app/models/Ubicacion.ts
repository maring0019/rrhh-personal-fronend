import { IPais } from './IPais';
import { ILocalidad } from './ILocalidad';
import { IProvincia } from './IProvincia';

export class Ubicacion {

    barrio: String;
    localidad: ILocalidad;
    provincia: IProvincia;
    pais: IPais;

    constructor(ubicacion?){
        ubicacion = ubicacion || {};
        if (ubicacion.barrio){
            this.barrio = ubicacion.barrio || null;
        }
        if (ubicacion.localidad){
            this.localidad = ubicacion.localidad || null;
        }
        if (ubicacion.provincia){
            this.provincia = ubicacion.provincia || null;
        }
        if (ubicacion.pais){
            this.pais = ubicacion.pais || null;
        }

    }
}
