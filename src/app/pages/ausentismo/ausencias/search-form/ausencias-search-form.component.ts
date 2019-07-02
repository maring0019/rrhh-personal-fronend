import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

import { Articulo } from 'src/app/models/Articulo';
import { AusenciaPeriodo } from 'src/app/models/AusenciaPeriodo';

import { ArticuloService } from 'src/app/services/articulo.service';
import { AusentismoService } from 'src/app/services/ausentismo.service';


@Component({
    selector: 'app-ausencias-search-form',
    templateUrl: 'ausencias-search-form.html'
})
export class AusenciasSearchFormComponent implements OnInit, OnDestroy {
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
        // Init Tipos Situacion
        this.articuloService.get({})
            .subscribe(data => {
                this.articulos = data;
        });
        this.searchForm = this.createSearchForm();
        this.searchForm.valueChanges.subscribe(() => {
            this.buscar(this.searchForm.value);
        });
    }

    ngOnDestroy(): void {
        clearInterval(this.timeoutHandle);
    }

    createSearchForm()
    {
        return this.formBuilder.group({
            fechaDesde      : [],
            fechaHasta      : [],
            articulo        : []
        });
    }

    // prepareSearchParams(searchForm:FormGroup){
    //     let _searchValues = searchForm.value;
    //     Object.keys(_searchValues).forEach( key => {
    //         console.log('Elem');
    //         console.log(key)
    //         // if (typeof _searchValues[key] === 'date') {
    //         //     _searchValues[key] = _searchValues[key].id;
    //         // }
    //         if (typeof _searchValues[key] === 'object') {
    //             _searchValues[key] = _searchValues[key].id;
    //         }
    //     });
    //     console.log('Salida');
    //     console.log(_searchValues);
    //     return _searchValues;
    // }

    /**
     * Busca ausencias cada vez que algun input del formulario de busqueda
     * cambia de valor.
     */
    public buscar(searchValues) {
        console.log('Buscando!!!!');

        console.log(searchValues);
        // if (this.searching) return ;
        
        // Cancela la búsqueda anterior
        if (this.timeoutHandle) {
            window.clearTimeout(this.timeoutHandle);
        }
        // let textoLibre = '';
        // Inicia búsqueda
        // if (textoLibre) {
            // this.prepareSearchParams(this.searchForm);
            this.timeoutHandle = window.setTimeout(() => {
                this.searchStart.emit();
                this.timeoutHandle = null;
                this.ausentismoService.searchAusenciasPeriodo(searchValues)
                    .subscribe(resultado => {
                        console.log('Volviendo de la busqueda');
                        console.log(resultado);
                        this.searchEnd.emit(resultado);
                    },
                    (err) => {
                        this.searchEnd.emit([])
                    }
                );
            }, 1000);
        // } else {
        //     this.searchClear.emit();
        // }
    }

    public altaAusencias(){
        // this.router.navigate(['/ausencias/registro']);
    }
}