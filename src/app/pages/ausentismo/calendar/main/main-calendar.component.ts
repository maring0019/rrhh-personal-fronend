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

    /**
     * Renderiza los eventos en el calendario con las siguientes condiciones:
     *  - Si existe solo un evento en un dia, la celda se 'rellena' completamente
     *    con el color indicado en el evento
     *  - Si existe mas de un evento en un dia se utiliza el render por default
     *    el cual 'apila' los eventos de la celda del dia.
     * @param info object provisto por fullcalendar. Contiene el evento interno 
     */
    customEventRenderWithReturnValue(info){
        let colEvent: HTMLDivElement;
        if (!this.otherEventOnSameDay(info.event)){
            colEvent = this.renderer.createElement('div');
            let linkEvent: HTMLAnchorElement = this.renderer.createElement('a');
            colEvent.className = "fc-custom-event"
            colEvent.style.backgroundColor = info.event.backgroundColor;
            linkEvent.className = "fc-event"
            linkEvent.innerText = info.event.title;
            colEvent.appendChild(linkEvent);
        }        
        return colEvent;
    }

    otherEventOnSameDay(eventB){
        const evento = this.eventos.find(
            eventA => (eventA.startString == eventB.extendedProps.startString
                    && eventA.id != eventB.id)
        );
        return evento;       
    }

    // compareEvent(eventA, eventB):boolean{
    //     return ()
    // }
    
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
