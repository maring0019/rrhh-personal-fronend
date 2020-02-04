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
        this.fechaDesde = periodo.fechaDesde || null;
        this.fechaHasta = periodo.fechaHasta || null;
        this.nombre = periodo.nombre || '';
        this.range = periodo.range || this.generateDateRange();
    }

    private generateDateRange() {
        let _fechaDesde = new Date(this.fechaDesde);
        let range = [];
        if (_fechaDesde && this.fechaHasta){
            while (_fechaDesde.getTime() <= this.fechaHasta.getTime()) {
                const tomorrow = this.addOneDay(_fechaDesde);
                if ( tomorrow.getMonth() != _fechaDesde.getMonth()){
                    let dayNumber = _fechaDesde.getDate();
                    while (dayNumber < 31){
                        range.push(null);
                        dayNumber +=1;
                    }
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

