import { Component, Output, EventEmitter, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AgenteService } from 'src/app/services/agente.service';
import { Agente } from 'src/app/models/Agente';
import { getAgenteSearchParams } from 'src/app/utils/searchUtils';
import { isEmpty } from 'src/app/utils/formUtils';


@Component({
    selector: 'app-agente-select-search-form',
    templateUrl: 'agente-select-search-form.html'
})
export class AgenteSelectSearchFormComponent implements OnInit, OnDestroy, OnChanges {
    public searchForm: FormGroup;
    public textoLibre: string = null;
    public autoFocus = 0;
    
    private timeoutHandle: number;

    // Se pueden indicar parametros extras de búsqueda
    @Input() searchParams: any = {}; 

    // Eventos Salida
    @Output() searchStart: EventEmitter<any> = new EventEmitter<any>();
    @Output() searchEnd: EventEmitter<Agente[]> = new EventEmitter<Agente[]>();
    @Output() searchClear: EventEmitter<any> = new EventEmitter<any>();


    constructor(
        private formBuilder: FormBuilder,
        private agenteService: AgenteService) {
    }

    public ngOnInit() {
        this.autoFocus = this.autoFocus + 1;
        this.searchForm = this.initSearchForm();
        // this.buscar({});
    }

    public ngOnChanges(changes:any){
        if (!changes['searchParams'].isFirstChange()) this.buscar({});
    }

  
    initSearchForm(){
        return this.formBuilder.group({
            textoLibre  : []
        });
    }

    ngOnDestroy(): void {
        clearInterval(this.timeoutHandle);
    }

    private prepareSearchParams(){
        let params:any = {};
        let form = this.searchForm.value;
        let textoLibre = form.textoLibre? form.textoLibre.trim(): "";
        params = getAgenteSearchParams(params, textoLibre);
        return {...params,...this.searchParams};
    }

    /**
     * Busca agentes cada vez que el campo de busqueda cambia su valor
     */
    public buscar($event) {
        // Error en Plex, ejecuta un change cuando el input pierde el
        // foco porque detecta que cambia el valor
        if ($event.type) {
            return;
        }
        this.prepareSearchParams();
        // Cancela la búsqueda anterior
        if (this.timeoutHandle) {
            window.clearTimeout(this.timeoutHandle);
        }
        // Inicia búsqueda
        let searchParams = this.prepareSearchParams();
        if (!isEmpty(searchParams)) {
            this.timeoutHandle = window.setTimeout(() => {
                this.searchStart.emit();
                this.timeoutHandle = null;
                this.agenteService.search(searchParams).subscribe(
                    resultado => {
                        // Parse de cada elemento de la lista en un 
                        // objeto Agente completo. Deberia hacerse en el servicio?
                        let agentes = resultado.map(e => e = new Agente(e));
                        this.searchEnd.emit(agentes);
                    },
                    (err) => {
                        this.searchEnd.emit([])
                    }
                );
            }, 1000);
        } else {
             this.searchClear.emit();
        }
    }
}