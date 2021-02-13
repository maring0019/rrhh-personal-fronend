import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';

import * as enumerados from 'src/app/models/enumerados';
import { GuardiaService } from 'src/app/services/guardia.service';
import { AgrupamientoService } from 'src/app/services/agrupamiento.service';
import { GuardiaPeriodoService } from 'src/app/services/guardia-periodo.service';
import { Auth } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-guardia-search-form',
    templateUrl: 'guardia-search-form.html',
})
export class GuardiaSearchFormComponent extends CRUDSearchFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //Search form options
    public tipoGuardiaOpciones = enumerados.getObjTipos(enumerados.TipoGuardia);
    public periodoOpciones$ = this.guardiaPeriodoService.get({});
    public servicioOpciones = this.authService.servicios;
    public categoriaOpciones$ = this.categoriaService.get({});
    public _serviciosAllowed; // 
    
    // Default search form values. Se usa en conjunto con los queryParams
    // para preservar las busquedas previas cuando se navega hacia atras
    public periodo;
    public servicio;
    public categoria;
    public tipoGuardia;

    constructor(
        formBuilder: FormBuilder,
        private objectService: GuardiaService,
        private authService: Auth,
        private categoriaService: AgrupamientoService,
        private guardiaPeriodoService: GuardiaPeriodoService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
            super(formBuilder);
            // Intentamos recuperar cualquier queryparam existente previo para
            // inicializar el form de busqueda y aplicar los filtros al ingresar
            // al ingresar a la pagina
            const queryParams = this.activatedRoute.snapshot.queryParams;
            
            this.periodo = (queryParams.periodo)? {_id: queryParams.periodo} : null;
            this.categoria = (queryParams.categoria)? {_id: queryParams.categoria} : null;
            this.tipoGuardia = (queryParams.tipoGuardia)? {id: queryParams.tipoGuardia} : null;
            this.servicio = (queryParams.servicio)? {_id:queryParams.servicio}: null;
    }

    // ngOnInit() {
    //     super.ngOnInit();
    // }

    public async ngOnInit() {
        this.autoFocus = this.autoFocus + 1;
        // 1. Inicializacion de las opciones de filtrado disponible en el
        // formulario de busqueda.
        this.initFormSelectOptions();
        // 2. Inicializacion del formulario a utilizar para las busquedas
        this.searchForm = this.initSearchForm();
        // 3. Por defecto siempre realizamos una busqueda al inicio
        await this.buscar();
    }

    public async buscar($event?) {
        // Error en Plex, ejecuta un change cuando el input pierde el
        // foco porque detecta que cambia el valor
        if ($event && $event.type) {
            return;
        }
        // await this.prepareSearchParams();
        // Cancela la búsqueda anterior
        if (this.timeoutHandle) {
            window.clearTimeout(this.timeoutHandle);
        }
        // Inicia búsqueda
        let searchParams = await this.prepareSearchParams();
        this.applyFilterToRoute();
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


    ngAfterViewInit(){
    }

    ngOnDestroy(){
        super.ngOnDestroy();
    }

    initFormSelectOptions(){

    }

    initSearchForm(){
        return this.formBuilder.group({
            periodo       : [this.periodo],
            servicio      : [this.servicio],
            categoria     : [this.categoria],
            tipoGuardia   : [this.tipoGuardia]
        });
    }

    applyFilterToRoute() {
        const form = this.searchForm.value;
		this.router.navigate(
			['/guardias',],
			{
                queryParams: {
                    periodo: (form.periodo)? form.periodo._id: null,
                    categoria: (form.categoria)? form.categoria._id:null,
                    tipoGuardia: (form.tipoGuardia)? form.tipoGuardia.id:null,
                    servicio: (form.servicio)? form.servicio._id:null,
                    servicioCodigo:  (form.servicio)? form.servicio.codigo:null},
				relativeTo: this.activatedRoute,
				// NOTE: By using the replaceUrl option, we don't increase the Browser's
				// history depth with every filtering keystroke. 
				replaceUrl: true
			}
		);
	}

    /**
     * Si el usuario tiene otorgado el permiso para procesar guardias, entonces
     * esta autorizado a visualizar todas las guardias de todos los servicios.
     * Caso contrario solo puede visualizar las guardias de su servicio/s
     */
    async getServiciosAllowed(){
        if (this._serviciosAllowed) return this._serviciosAllowed;
        
        this._serviciosAllowed = [];
        if (!await this.authService.check('guardias:guardia:procesar_guardia')){
            this._serviciosAllowed = this.authService.servicios.map(i=>i._id)
        }
        return this._serviciosAllowed;
    }

    async prepareSearchParams(){
        let params:any = {};
        if (this.searchForm.valid){
            let form = this.searchForm.value;
            // if (form.estado){   // Filtro por estado del parte
            //     params['estado.id'] = form.estado.id;
            // }
            // if (form.procesado){
            //     if (form.procesado.id == 'si'){
            //         params['procesado'] = true;
            //     }
            //     else{
            //         params['procesado!'] = true;
            //     }
            // }
            if (form.periodo){
                params['periodo._id'] = form.periodo._id;
            }

            if (form.servicio){
                params['lote.servicio._id'] = form.servicio._id
            }
            else{
                params['lote.servicio._id'] = await this.getServiciosAllowed();
            }
            if (form.categoria){
                params['lote.categoria._id'] = form.categoria._id;
            }
            if (form.tipoGuardia){
                params['lote.tipoGuardia'] = form.tipoGuardia.id;
            }
            // Sorting
            params['sort'] = '-fechaEntrega';
        }
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
