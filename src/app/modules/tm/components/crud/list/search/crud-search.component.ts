import { Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export abstract class CRUDSearchFormComponent implements OnInit, OnDestroy {
    public searchForm: FormGroup;
    private timeoutHandle: number;
    public autoFocus = 0;
    public mostrarMasOpciones = false;

    // Search DOMAIN options
    public textoLibre: string = null;
    

    // Eventos
    @Output() searchStart: EventEmitter<any> = new EventEmitter<any>();
    @Output() searchEnd: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output() searchClear: EventEmitter<any> = new EventEmitter<any>();


    constructor(
        public formBuilder: FormBuilder) { 
    }

    
    /**
     * Define el comportamiento por defecto en la inicializacion del componente de
     * busqueda. Basicamente realiza tres pasos a saber:
     * 
     * Importante: Siempre implementar este metodo y realizar una llamada explicita
     * a super.ngOnInit() en las clases concretas que extienden este componente para
     * obtener el mismo comportamiento definido aqui, ya que Angular no invoca por 
     * defecto a este evento en las subclases que extienden un componente.
     * Todos los metodos que se invocan se pueden sobreescribir individualmente, o
     * si se requiere se puede modificar por completo el comportamiento propuesto.
     */
    public ngOnInit() {
        this.autoFocus = this.autoFocus + 1;
        // 1. Inicializacion de las opciones de filtrado disponible en el
        // formulario de busqueda.
        this.initFormSelectOptions();
        // 2. Inicializacion del formulario a utilizar para las busquedas
        this.searchForm = this.initSearchForm();
        // 3. Por defecto siempre realizamos una busqueda al inicio
        this.buscar();
    }

    abstract initFormSelectOptions();

    abstract initSearchForm():FormGroup; // {  return this.formBuilder.group({}) }

    abstract search(searchParams);

    protected prepareSearchParams(){
        return {};
    }

    /**
     * Realiza una busqueda cada vez que uno de los elementos del formulario
     * de busqueda cambia de valor. 
     * Este metodo define un conjunto de pasos a saber previos a realizar la 
     * busqueda:
     *          - Cancela cualquier busqueda previa
     *          - Prepara los parametros de busqueda
     *          - Notifica la inicializacion de la busqueda a traves de un evento
     *            de salida @Output
     *          - Realiza la busqueda
     * Importante:
     *          - El proceso de busqueda pueda ser reemplazado por completo por
     *            uno que se adapte a las necesidades requeridas
     *          - La busqueda real se hace efectivamente en el metodo abstracto
     *            search, el cual siempre debe ser implementado en los componentes
     *            que extienden esta clase 
     */
    public buscar($event?) {
        // Error en Plex, ejecuta un change cuando el input pierde el
        // foco porque detecta que cambia el valor
        if ($event && $event.type) {
            return;
        }
        this.prepareSearchParams();
        // Cancela la búsqueda anterior
        if (this.timeoutHandle) {
            window.clearTimeout(this.timeoutHandle);
        }
        // Inicia búsqueda
        let searchParams = this.prepareSearchParams();
        // if (!isEmpty(searchParams)) {
        if (true){
            this.timeoutHandle = window.setTimeout(() => {
                this.searchStart.emit();
                this.timeoutHandle = null;
                this.search(searchParams);
            }, 1000);
        } else {
            this.searchClear.emit();
        }
    }


    ngOnDestroy(): void {
        clearInterval(this.timeoutHandle);
    }
}