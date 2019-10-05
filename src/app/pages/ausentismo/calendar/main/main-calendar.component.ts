import { Component, OnInit, ViewChild, Input, Output, AfterViewInit, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { getTomorrow } from 'src/app/utils/dates';
import { CalendarStoreService, IDateRangeSelection } from 'src/app/stores/calendar.store.service';


@Component({
    selector: 'app-main-calendar',
    templateUrl: 'main-calendar.html'
})

export class MainCalendarComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() eventos;
    @Input() options;
    @Input() mesSeleccionado:Date;
    @Input() weekends:Boolean;

    @Output() changedDate: EventEmitter<Date> = new EventEmitter<Date>();
   
    @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

    storeSubscription: Subscription;
    private _rangeSelection: IDateRangeSelection;
    
    constructor(private calendarStoreService: CalendarStoreService,
        private renderer: Renderer2){
            this.storeSubscription = this.calendarStoreService.selectionRange$
                .subscribe(rangeSelection => {
                    if (rangeSelection) {
                        this.updateSelectedMonthView(rangeSelection.fechaDesde);
                    }
                    this._rangeSelection = rangeSelection;
                    this.marcarPeriodoSeleccionado();
                });
        }

    
    calendarApi:any;
    mesVisualizado:Date = new Date(2013, 1, 1);
    
    calendarPlugins = [dayGridPlugin, interactionPlugin];

    header = {
        left: '',
        center: 'title',
        right: ''
    };
    columnHeaderText = (date: Date) : string => {
        var days = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
        var shortDayName = days[date.getDay()];
        return shortDayName;
    }

    eventRender = (info:any) => {
        
        // console.log(info.el)
        
            // this.searchStart.emit();
            // this.timeoutHandle = null;
            // this.search(searchParams);
        // return false;
        
        console.log(info)
        
        let colEvent: HTMLDivElement  = this.renderer.createElement('div');
        let linkEvent: HTMLAnchorElement = this.renderer.createElement('a');
        colEvent.className = "fc-custom-event"
        linkEvent.className = "fc-event"
        linkEvent.innerText = info.event.title;
        // linkEvent.addEventListener("click", function(){alert('Hola')});
        linkEvent.addEventListener('click', this.onClicker.bind(this, info.event));
        colEvent.appendChild(linkEvent);
        // console.log('El');
        // console.log(info.el);
        // this.renderer.setValue(info.el,)
        info.el.innerHtml = colEvent;
        // let parent = this.renderer.parentNode(info.el);//  appendChild(info.el.parentNode, colEvent);
        // console.log(parent);
        //  this.renderer.appendChild(this.div.nativeElement, p)
        // return false;
        // console.log('Hola Render');
        // console.log(info);
        // info.el = '<td>hola</td>'
        // console.log(p);
        // info.el = p;
        // return p;
        // return '<td>hola</td>';
    }

    onClicker(event){
        
        console.log('HOLITA!!!!!!!!!')
        console.log(event);
    }

    customEventRenderWithReturnValue(info){
        console.log(info);
        let colEvent: HTMLDivElement  = this.renderer.createElement('div');
        let linkEvent: HTMLAnchorElement = this.renderer.createElement('a');
        colEvent.className = "fc-custom-event"
        colEvent.style.backgroundColor = info.event.backgroundColor;
        linkEvent.className = "fc-event"
        linkEvent.innerText = info.event.title;
        colEvent.appendChild(linkEvent);
        // // info.el = colEvent;
        // let parent = this.renderer.parentNode(info.el);//  appendChild(info.el.parentNode, colEvent);
        // console.log(parent);
        // return colEvent;
        // return false;
        return colEvent;
    }
    
    public ngOnInit() {

    }

    ngAfterViewInit(){
        this.calendarApi = this.calendarComponent.getApi();
        this.calendarComponent.getApi().setOption('eventRender', (info) => {
            return this.customEventRenderWithReturnValue(info);
          });
    }

    ngOnChanges(){
        if (this.mesSeleccionado != this.mesVisualizado){
            this.mesVisualizado = this.mesSeleccionado;
            if (this.calendarApi){
                this.calendarApi.gotoDate(this.mesVisualizado);
            }
        }
    }
    


    ngOnDestroy() {
        this.storeSubscription.unsubscribe();
      }

    public gotoNextMonth(){
        this.updateSelectedMonthView(this._getNextMonth(this.mesVisualizado));
        this.marcarPeriodoSeleccionado();
    }

    public gotoPreviousMonth(){
        this.updateSelectedMonthView(this._getPrevMonth(this.mesVisualizado));
        this.marcarPeriodoSeleccionado();
    }

    public onDateClick(e){
        console.log('DATE CLICK')
        console.log(e);
        // if (jsEvent.target.classList.contains('fc-bgevent')) {
        //     alert('Click Background Event Area');
        // }

        this.calendarStoreService.selectionRange = { fechaDesde:e.date, fechaHasta:getTomorrow(e.date) };
    }

    public onEventClick(e){
        if (e && e.event){
            console.log('EVENTO#############CLICKED');
            console.log(e)
            const props = e.event.extendedProps;

            this.calendarStoreService.selectionRange = { fechaDesde:props.ausentismoFechaDesde, fechaHasta:getTomorrow(props.ausentismoFechaHasta) };
            this.enableContextMenu(e);
        }
    }


    public onDateRangeSelection(e){
        this.calendarStoreService.selectionRange = { fechaDesde:e.start, fechaHasta:e.end };
    }

    private updateSelectedMonthView(newMonth:Date){
        this.mesVisualizado = newMonth;
        this.mesSeleccionado = newMonth;
        if (this.calendarApi) this.calendarApi.gotoDate(this.mesVisualizado);
        
        this.changedDate.emit(this.mesVisualizado);
    }

    private marcarPeriodoSeleccionado(){
        console.log('MARCAR PERIODO SELECCIONADO###########')
        if (this.calendarApi){
            if (this._rangeSelection){
                this.calendarApi.select(this._rangeSelection.fechaDesde, this._rangeSelection.fechaHasta );
            }
            else{
                this.calendarApi.unselect();
            }    
        }
    }

    contextmenu = true;
    contextmenuX = 0;
    contextmenuY = 0;

    //activates the menu with the coordinates
    enableContextMenu(e){
        this.contextmenuX=e.jsEvent.clientX
        this.contextmenuY=e.jsEvent.clientY
        this.contextmenu=true;
    }
    //disables the menu
    disableContextMenu(){
        this.contextmenu= false;
    }

    private _getNextMonth(currentMonth:Date):Date{
        return new Date(new Date(currentMonth).setMonth(currentMonth.getMonth()+1));
    }

    private _getPrevMonth(currentMonth:Date):Date{
        return new Date(new Date(currentMonth).setMonth(currentMonth.getMonth()-1));
    }
}
