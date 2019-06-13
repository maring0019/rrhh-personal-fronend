import { Component, OnInit, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'app-nav-calendar',
    templateUrl: 'nav-calendar.html'
})

export class NavCalendarComponent implements OnInit {

    prevMonth = new Date().setMonth(new Date().getMonth()-1);
    nextMonth = new Date().setMonth(new Date().getMonth()+1);
    calendarPlugins = [dayGridPlugin];
    header = {
        left: '',
        center: 'title',
        right: ''
    };
    columnHeaderText = (date: Date) : string => {
        var days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
        var shortDayName = days[date.getDay()];
        return shortDayName;
    }

    public ngOnInit() {
    }

    
    
    greet(date):string { //the function returns a string 
        return "Hello World" 
    }

}
