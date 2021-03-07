export class IndicadorLicencia {
    _id: String;
    agente: {
        _id: String,
        nombre: String,
        apellido: String,
        numero: String
    };
    articulo: {
        _id: String,
        codigo: String
    }
    vigencia: Number;
    totales: number;
    ejecutadas: number;
    vencido: Boolean;
    
    get disponibles(){
        return (this.totales && this.ejecutadas)? this.totales - this.ejecutadas:0;
    }

    constructor(indicador?){
        indicador = indicador || {};
        this._id = indicador._id || null;
        this.agente = indicador.agente || null;
        this.vigencia = indicador.vigencia;
        this.totales = indicador.totales;
        this.ejecutadas = indicador.ejecutadas;
        this.vencido = indicador.vencido;
    }
}

