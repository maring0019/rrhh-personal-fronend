let today = new Date();
let offset = today.getTimezoneOffset()/60;
let localTime = (offset<0)? 24 - Math.abs(offset): offset;
let localTimeFormat = "T" + `0${localTime}:00:00Z`.slice(-9); // por ej. T03:00:00Z si el offset es 3 (Argentina)

/**
 * Manipulamos el objeto Date recibido por parametro para visualizar
 * correctamente la fecha cuando se utiliza el componente <plex-datetime>
 * ya que el mismo no soporta mostrar valores utilizando UTC.
 * Utilizamos el timezone offset del cliente para obtener la misma fecha
 * independientemente de la zona horaria que cada usuario tenga configurada
 * localmente.
 * @param date 
 */
export function localDate(date:Date){
    if (!date) return null;
    let df = moment(date).utc().format('YYYY-MM-DD');
    return new Date(df+localTimeFormat);
}


export function  getTomorrow(date){
    let tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + 1);
    return tomorrow;
}

export function getYesterday(date){
    let yesterday = new Date(date);
    yesterday.setDate(date.getDate() - 1);
    return yesterday;
}


export function getNextMonth(date:Date){
    return new Date(moment(date).add(1,'M')); 
}

export function getPrevMonth(date:Date){
    return new Date(moment(date).add(-1,'M')); 
}

export function getWeekdays(month:number, year:number){
    let date = new Date(year, month + 1, 0);
    let days = date.getDate();
    let weekdays = [];
    for(var i=1; i<=days; i++) {
        date = new Date(year, month, i)
        if (isWeekday(date)) weekdays.push(date)
    }
    return weekdays;
}


export function isWeekday(date:Date) {
    const day = date.getDay();
    return day==0 || day ==6;
}

export function parseStrToDate(date, defaultDate=null, format="YYYY-MM-DD"){
    try {
        return moment(date).format(format);    
    } catch (error) {
        if (defaultDate) return defaultDate;
        throw error;
    }
    

}