import { localDate } from 'src/app/utils/dates';

export class GuardiaPeriodo {
    _id?: String;
    fechaDesde: Date;
    fechaHasta: Date;
    nombre: String;
    range: Date[] = [];

    constructor(periodo?)
    {
        periodo = periodo || {};
        this._id = periodo._id || null;
        this.fechaDesde = localDate(periodo.fechaDesde);
        this.fechaHasta = localDate(periodo.fechaHasta);
        this.nombre = periodo.nombre || '';
        this.range = periodo.range || this.generateDateRange();
    }

    private generateDateRange() {
        let _fechaDesde = new Date(this.fechaDesde);
        let range = [];
        if (_fechaDesde && this.fechaHasta){
            while (_fechaDesde.getTime() <= this.fechaHasta.getTime()) {
                let tomorrow = this.addOneDay(_fechaDesde);
                if ( tomorrow.getMonth() != _fechaDesde.getMonth()){
                    // LLegamos al cambio de mes
                    range.push(_fechaDesde);
                    let dayNumber = _fechaDesde.getDate();
                    while (dayNumber < 31){
                        // Si el primer mes tiene menos de 31 dias 
                        // rellenamos con valores nulos
                        range.push(null);
                        dayNumber +=1;
                    }
                    // Incrementamos el puntero y continuamos con el 
                    // mes siguiente
                    _fechaDesde = tomorrow;
                    tomorrow = this.addOneDay(tomorrow);
                }
                range.push(_fechaDesde);
                _fechaDesde = tomorrow;
            }
        }
        return range;
    }

    private addOneDay(date:Date){
        let tomorrow = new Date(date);
        return new Date(tomorrow.setDate(tomorrow.getDate() + 1 ));
    }
}

