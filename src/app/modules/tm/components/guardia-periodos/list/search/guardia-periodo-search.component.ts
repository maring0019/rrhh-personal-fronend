import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { GuardiaPeriodoService } from 'src/app/services/guardia-periodo.service';


@Component({
    selector: 'app-guardia-periodo-search',
    templateUrl: 'guardia-periodo-search.html',
})
export class GuardiaPeriodoSearchComponent implements OnInit, OnDestroy {

    public searchForm: FormGroup;
    public autoFocus = 0;
    public mostrarMasOpciones = false;

    private timeoutHandle: number;

    // Search DOMAIN options
    public textoLibre: string = null;
    

    // Eventos
    @Output() searchStart: EventEmitter<any> = new EventEmitter<any>();
    @Output() searchEnd: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output() searchClear: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private formBuilder: FormBuilder,
        private objectService: GuardiaPeriodoService) {}

    ngOnInit() {
        this.autoFocus = this.autoFocus + 1;
        // 1. Inicializacion de las opciones de filtrado disponible en el
        // formulario de busqueda.
        this.initFormSelectOptions();
        // 2. Inicializacion del formulario a utilizar para las busquedas
        this.searchForm = this.initSearchForm();
        // 3. Por defecto siempre realizamos una busqueda al inicio
        this.buscar();
    }

    initFormSelectOptions(){}

    initSearchForm(){
        return this.formBuilder.group({
            textoLibre            : []
        });
    }

    public buscar($event?) {
        // Error en Plex, ejecuta un change cuando el input pierde el
        // foco porque detecta que cambia el valor
        if ($event && $event.type) {
            return;
        }
        // this.prepareSearchParams();
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

    prepareSearchParams(){
        let params:any = {};
        let form = this.searchForm.value;
        if (form.textoLibre && form.textoLibre.length >= 4){
            const exp = form.textoLibre;
            params['filter'] = JSON.stringify(
                {"$or":[
                    {"nombre"      :{"$regex": exp, "$options":"i"}}
                ]}) 
        }
        // Sorting
        params['sort'] = 'nombre';      
        return params;
    }

    search(searchParams){
        this.objectService.get(searchParams).subscribe(
            objects => {
                this.searchEnd.emit(objects);
            },
            (err) => {
                this.searchEnd.emit([])
            }
        );
    }

}
