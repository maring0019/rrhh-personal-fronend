import { Component, OnInit, ViewChild, Input, Output, AfterViewInit, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { getTomorrow, getYesterday, getNextMonth, getPrevMonth } from 'src/app/utils/dates';
import { CalendarStoreService, IDateRangeSelection } from 'src/app/stores/calendar.store.service';
import { Ausentismo } from 'src/app/models/Ausentismo';


@Component({
    selector: 'app-main-calendar',
    templateUrl: 'main-calendar.html'
})

export class MainCalendarComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() customEventRender: Boolean = false;
    @Input() eventos; // Listado de eventos a mostrar en el calendario
    @Input() options; // Opciones/configuracion del calendario
    @Input() mesSeleccionado: Date; // Indica el mes a visualizar. Puede ir variando
    @Input() weekends: Boolean; // Flag para indicar si se muestran o no los sab/dom

    @Output() changedDate: EventEmitter<Date> = new EventEmitter<Date>();

    @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

    storeSubscription: Subscription;
    private _rangeSelection: IDateRangeSelection;


    constructor(private calendarStoreService: CalendarStoreService,
        private renderer: Renderer2) {
            this.subscribeRangeSelectionChanges();
        
    }

    /**
     * Referencia a la API de fullCalendar. Se utiliza para la mayoria de
     * las interacciones con el calendario (por ej. para 'navegar' a una
     * fecha en particular del calendario)
     */
    calendarApi: any;
    
    mesVisualizado: Date = new Date(2013, 1, 1);

    /**
     * Listado de plugins que utiliza fullCalendar para proveer diferentes
     * funcionalidades.
     * dayGridPlugin provee principalmente la vista mensual del calendario 
     * interactionPlugin permite principalmente seleccionar periodos
     */
    calendarPlugins = [dayGridPlugin, interactionPlugin];
    // Ver si es posible desactivar el interactionPlugin al editar o cargar

    header = {
        left: '',
        center: 'title',
        right: ''
    };

    /**
     * Metodo para personalizar el encabezado del calendario
     */
    columnHeaderText = (date: Date): string => {
        var days = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
        var shortDayName = days[date.getDay()];
        return shortDayName;
    }


    ngOnInit() {    }

    ngAfterViewInit() {
        this.calendarApi = this.calendarComponent.getApi();
        if (this.customEventRender) return this.enableCustomEventRender();

    }

    ngOnChanges() {
        if (this.mesSeleccionado != this.mesVisualizado) {
            this.mesVisualizado = this.mesSeleccionado;
            if (this.calendarApi) {
                this.calendarApi.gotoDate(this.mesVisualizado);
            }
        }
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe();
    }

    private enableCustomEventRender() {
        this.calendarComponent.getApi().setOption('eventRender', (info) => {
            return this.customEventRenderWithReturnValue(info);
        });
    }

    /**
     * Renderiza los eventos en el calendario con las siguientes condiciones:
     *  - Si existe solo un evento en un dia, la celda se 'rellena' completamente
     *    con el color indicado en el evento
     *  - Si existe mas de un evento en un dia se utiliza el render por default
     *    el cual 'apila' los eventos de la celda del dia.
     * @param info object provisto por fullcalendar. Contiene el evento interno
     * @deprecated 
     */
    private customEventRenderWithReturnValue(info) {
        let colEvent: HTMLDivElement;
        if (!this.otherEventOnSameDay(info.event)) {
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

    private otherEventOnSameDay(eventB) {
        const evento = this.eventos.find(
            eventA => (eventA.startString == eventB.extendedProps.startString
                && eventA.id != eventB.id)
        );
        return evento;
    }

    public gotoNextMonth() {
        this.updateSelectedMonthView(getNextMonth(this.mesVisualizado));
    }

    public gotoPreviousMonth() {
        this.updateSelectedMonthView(getPrevMonth(this.mesVisualizado));
    }

    /**
     * Metodo que se invoca cuando se hace click sobre algun dia del calendario.
     * Se deben realizar las siguientes acciones sobre el store:
     *   - Actualizar periodo seleccionado (es el dia seleccionado)
     *   - Actualizar ausentismo seleccionado. Se debe dejar vacio
     * Obs: Var aparte como interactuan los metodos
     *   - onEventClick()
     *   - onDateRangeSelection()   
     * @param e day event from calendar
     * @deprecated reemplazado por onDateRangeSelection()
     */
    public onDateClick(e) {
        this.calendarStoreService.selectionRange = { fechaDesde: e.date, fechaHasta: e.date };
        this.calendarStoreService.ausentismoSelected = null;
    }

    /**
     * Metodo que se invoca cuando se hace click sobre algun evento del calendario.
     * Se deben realizar las siguientes acciones sobre el store:
     *   - Actualizar periodo seleccionado. Se utilizan las fechas indicadas en el 
     *     evento
     *   - Actualizar ausentismo seleccionado. Si el evento es una ausencia se debe
     *     utilizar el id provisto por el mismo, sino se debe dejar en vacio.
     * Obs: Var aparte como interactuan los metodos
     *   - onDateClick()
     *   - onDateRangeSelection()   
     * @param e event from calendar
     */
    public onEventClick(e) {
        if (e && e.event) {
            const props = e.event.extendedProps;
            this.calendarStoreService.selectionRange = { fechaDesde: new Date(props.ausentismoFechaDesde), fechaHasta: new Date(props.ausentismoFechaHasta) };
            this.calendarStoreService.ausentismoSelected = new Ausentismo({ id: props._id })
        }
    }

    /**
     * Metodo que se invoca cuando se selecciona un conjunto de dias del calendario.
     * Se deben realizar las siguientes acciones sobre el store:
     *   - Actualizar periodo seleccionado. Se utiliza las fechas de la seleccion
     *     realizada.
     *   - Actualizar ausentismo seleccionado. Se debe dejar vacio 
     * Obs: Var aparte como interactuan los metodos
     *   - onDateClick()   
     *   - onEventClick()
     * @param e range event from calendar
     */
    public onDateRangeSelection(e) {
        this.calendarStoreService.selectionRange = { 
                fechaDesde: e.start,
                fechaHasta: getYesterday(e.end),
                source: 'jsEvent' // Indicamos el origen para evitar ciclos infinitos llamando a la API
            };
        this.calendarStoreService.ausentismoSelected = null;
    }



    private updateSelectedMonthView(newMonth: Date) {
        this.mesVisualizado = newMonth;
        this.mesSeleccionado = newMonth;
        if (this.calendarApi) this.calendarApi.gotoDate(this.mesVisualizado);
        this.changedDate.emit(this.mesVisualizado);
        // this.calendarStoreService.ausentismoSelected = null;
        this.marcarPeriodoSeleccionado();
    }

    
    /**
     * Subscripcion a cualquier cambio realizado sobre el periodo de fechas
     * seleccionados. Una vez que hemos sido notificados del cambio se debe
     * indicar visualmente este periodo en el calendario.
     * La seleccion del periodo puede realizarse en diferentes componentes
     * (por ej. desde el listado de ausencias), pero todos los componentes
     * actualizan el store para indicar el mismo.
     */
    private subscribeRangeSelectionChanges(){
        this.storeSubscription = this.calendarStoreService.selectionRange$
            .subscribe(rangeSelection => {
                this._rangeSelection = rangeSelection;
                if (rangeSelection) {
                    if (!rangeSelection.source || rangeSelection.source != 'jsEvent'){
                        // Control para prevenir loops infinitos
                        this.updateSelectedMonthView(rangeSelection.fechaDesde);
                        this.marcarPeriodoSeleccionado();
                    } 
                }
                else{
                    this.marcarPeriodoSeleccionado();
                }
            });
    }

    private marcarPeriodoSeleccionado() {
        if (this.calendarApi) {
            if (this._rangeSelection) {
                this.calendarApi.select(
                    this._rangeSelection.fechaDesde,
                    this._rangeSelection.fechaHasta
                    );
            }
            else {
                this.calendarApi.unselect();
            }
        }
    }
}
