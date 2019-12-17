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