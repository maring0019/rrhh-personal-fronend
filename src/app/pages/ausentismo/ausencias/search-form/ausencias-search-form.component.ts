import { Component, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';

import { Articulo } from 'src/app/models/Articulo';
import { AusenciaPeriodo } from 'src/app/models/AusenciaPeriodo';
import { Agente } from 'src/app/models/Agente';

import { ArticuloService } from 'src/app/services/articulo.service';
import { AusentismoService } from 'src/app/services/ausentismo.service';



@Component({
    selector: 'app-ausencias-search-form',
    templateUrl: 'ausencias-search-form.html'
})
export class AusenciasSearchFormComponent implements OnInit, OnDestroy {
    @Input() agente: Agente;
    
    private timeoutHandle: number;
    public searchForm: FormGroup;
    public searching = true;
    
    public articulos: Articulo[] = [];

    // Eventos
    @Output() searchStart: EventEmitter<any> = new EventEmitter<any>();
    @Output() searchEnd: EventEmitter<AusenciaPeriodo[]> = new EventEmitter<AusenciaPeriodo[]>();
    @Output() searchClear: EventEmitter<any> = new EventEmitter<any>();


    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private ausentismoService: AusentismoService,
        private articuloService: ArticuloService) {
    }

    ngOnInit() {
        this.initSelectOptions();
        this.searchForm = this.createSearchForm();
        this.searchForm.valueChanges.subscribe(() => {
            this.buscar();
        });
        // Al ingresar por primera vez realizamos una busqueda
        this.buscar();
    }

    ngOnDestroy(): void {
        clearInterval(this.timeoutHandle);
    }

    /**
     * Inicializa las opciones de los diferentes elementos
     * select disponible en el componente
     */
    initSelectOptions(){
        this.articuloService.get({})
            .subscribe(data => {
                this.articulos = data;
        });
    }

    createSearchForm()
    {
        return this.formBuilder.group({
            agente          : [this.agente],
            fechaDesde      : [],
            fechaHasta      : [],
            articulo        : []
        });
    }


    /**
     * Busca ausencias cada vez que algun input del formulario de busqueda
     * cambia de valor.
     */
    public buscar() {
        if (!this.searchForm.valid) return;
        // Cancela la búsqueda anterior
        if (this.timeoutHandle) {
            window.clearTimeout(this.timeoutHandle);
        }
        const searchValues = this.prepareSearchParams(this.searchForm.value);
        this.searchStart.emit();
        this.timeoutHandle = window.setTimeout(() => {
            this.timeoutHandle = null;
            this.ausentismoService.searchAusenciasPeriodo(searchValues)
                .subscribe(resultado => {
                    this.searchEnd.emit(resultado);
                },
                (err) => {
                    this.searchEnd.emit([])
                }
            );
        }, 500);
    }

    prepareSearchParams(searchValues){
        let _sv = {};
        if (searchValues.agente) _sv = {..._sv, agenteId: searchValues.agente.id}
        if (searchValues.articulo) _sv = {..._sv, articuloId: searchValues.articulo.id}
        if (searchValues.fechaDesde) _sv = {..._sv, fechaDesde: searchValues.fechaDesde}
        if (searchValues.fechaHasta) _sv = {..._sv, fechaHasta: searchValues.fechaHasta}
        return _sv;
    }

    public altaAusencias(){
        // this.router.navigate(['/ausencias/registro']);
    }
}