export interface IEventoCalendar {
    id:String,
    title: String,
    start: Date,
    allDay: Boolean,
    color: String,
    type: String,
    ausentismoFechaDesde: Date,
    ausentismoFechaHasta: Date,
}