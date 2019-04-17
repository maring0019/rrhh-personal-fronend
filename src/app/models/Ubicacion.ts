export class Ubicacion {
    // barrio: {
    //     id: String,
    //     nombre: String
    // };
    // localidad: {
    //     id: String,
    //     nombre: String
    // };
    // provincia: {
    //     id: String,
    //     nombre: String
    // };
    // pais: {
    //     id: String,
    //     nombre: String
    // };

    barrio: String;
    localidad: String;
    provincia: String;
    pais: String;

    constructor(ubicacion?){
        ubicacion = ubicacion || {};
        if (ubicacion.barrio){
            this.barrio = ubicacion.barrio || '';
        }
        if (ubicacion.localidad){
            this.localidad = ubicacion.localidad || '';
        }
        if (ubicacion.provincia){
            this.provincia = ubicacion.provincia || '';
        }
        // if (ubicacion.barrio){
        //     this.barrio.id = ubicacion.barrio.id || '';
        //     this.barrio.nombre = ubicacion.barrio.nombre || '';
        // }
        // if (ubicacion.localidad){
        //     this.localidad.id = ubicacion.localidad.id || '';
        //     this.localidad.nombre = ubicacion.localidad.nombre || '';
        // }
        // if (ubicacion.provincia){
        //     this.provincia.id = ubicacion.provincia.id || '';
        //     this.provincia.nombre = ubicacion.provincia.nombre || '';
        // }
    }
}
