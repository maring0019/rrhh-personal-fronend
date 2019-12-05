export class GuardiaPeriodo {
    id: String;
    fechaDesde: Date;
    fechaHasta: Date;
    nombre: String;
    range: Date[] = [];

    constructor(periodo?)
    {
        periodo = periodo || {};
        this.id = periodo.id || null;
        this.fechaDesde = periodo.fechaDesde || null;
        this.fechaHasta = periodo.fechaHasta || null;
        this.nombre = periodo.nombre || '';
        this.range = periodo.range || this.generateDateRange();
    }

    private generateDateRange() {
        let range = [];
        if (this.fechaDesde && this.fechaHasta){
            while (this.fechaDesde.getTime() <= this.fechaHasta.getTime()) {
                const tomorrow = this.addOneDay(this.fechaDesde);
                if ( tomorrow.getMonth() != this.fechaDesde.getMonth()){
                    let dayNumber = this.fechaDesde.getDate();
                    while (dayNumber < 31){
                        range.push(null);
                        dayNumber +=1;
                    }
                }
                range.push(this.fechaDesde);
                this.fechaDesde = tomorrow;
            }
        }
        return range;
    }

    private addOneDay(date:Date){
        let tomorrow = new Date(date);
        return new Date(tomorrow.setDate(tomorrow.getDate() + 1 ));
    }
}

