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

    public ngOnInit() {
        this.autoFocus = this.autoFocus + 1;
        this.initFormSelectOptions();
        this.searchForm = this.initSearchForm();
        this.buscar();
    }

    protected initFormSelectOptions(){
        return;
    }

    protected initSearchForm(){
        return this.formBuilder.group({});
    }

    protected prepareSearchParams(){
        return {};
    }

    /**
     * Realiza una busqueda cada vez que uno de los elementos del form 
     * cambian de valor
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

    protected search(searchParams){

    }

    ngOnDestroy(): void {
        clearInterval(this.timeoutHandle);
    }
}