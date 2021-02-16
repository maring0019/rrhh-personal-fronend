import { BehaviorSubject } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';

import * as enumerados from 'src/app/models/enumerados';
import { GuardiaService } from 'src/app/services/guardia.service';
import { AgrupamientoService } from 'src/app/services/agrupamiento.service';
import { GuardiaPeriodoService } from 'src/app/services/guardia-periodo.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { Auth } from 'src/app/services/auth.service';


@Component({
    selector: 'app-guardia-search-form',
    templateUrl: 'guardia-search-form.html',
})
export class GuardiaSearchFormComponent extends CRUDSearchFormComponent implements OnInit, OnDestroy {

    // Search form select options
    public tipoGuardiaOpciones = enumerados.getObjTipos(enumerados.TipoGuardia);
    public periodoOpciones$ = this.guardiaPeriodoService.get({});
    public servicioOpciones = []
    public categoriaOpciones$ = this.categoriaService.get({});
    public estadoOpciones = [];
    public serviciosAllowed; // Id de los servicios del jefe de servicio
    
    // Default search form values. Se usa en conjunto con los queryParams
    // para preservar las busquedas previas cuando se navega hacia atras
    public periodo;
    public servicio;
    public categoria;
    public tipoGuardia;
    public estado;

    // Estas estructuras nos notificaran cuando el formulario este listo 
    protected _form = new BehaviorSubject(null);
    readonly form$ = this._form.asObservable();

    public get form(){
        return this._form.getValue();
    }
    
    public set form(val){
        this._form.next(val);
    }

    // Permisos especiales. Si el usuario logueado dispone de este permiso podra
    // operar libremente en el modulo. Caso contrario estará restringido a los 
    // servicios disponibles como jefe de servicio/dpto/etc.    
    public canProcesarGuardia:Boolean = false;

    constructor(
        formBuilder: FormBuilder,
        private objectService: GuardiaService,
        private authService: Auth,
        private categoriaService: AgrupamientoService,
        private ubicacionService: UbicacionService,
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
            this.estado = (queryParams.estado)? {id:queryParams.estado}: null;
    }

    public async ngOnInit() {
        this.autoFocus = this.autoFocus + 1;
        this.canProcesarGuardia = await this.authService.check('guardias:guardia:procesar_guardia');
        this.getServiciosAllowed();
        this.initFormSelectOptions()
        this.initSearchForm();
        
        // Cuando este disponible el formulario de busqueda realizamos la busqueda
        this.form$.subscribe(data => { 
            if (data) {
                this.searchForm = data;
                this.buscar();
            }
        } );
    }

    ngOnDestroy(){
        super.ngOnDestroy();
    }

    initFormSelectOptions(){
        this.estadoOpciones = [
            { id: 0, nombre: 'Sin Confirmar' },
            { id: 1, nombre: 'Confirmada'},
            { id: 2, nombre: 'Procesada'}
        ]

        if (this.canProcesarGuardia){
            this.ubicacionService.get({}).subscribe(servicios =>
                this.servicioOpciones = servicios)
        }
        
        if (this.serviciosAllowed && this.serviciosAllowed.length){
            this.servicioOpciones = this.serviciosAllowed;
        }        
    }

    initSearchForm(){
        let form = {
            periodo       : [this.periodo],
            servicio      : [this.servicio],
            categoria     : [this.categoria],
            tipoGuardia   : [this.tipoGuardia],
            estado        : [this.estado]
        }

        if (this.periodo || this.servicio || this.categoria || this.tipoGuardia || this.estado){
            // Si se aplicó algun filtro previamente no modificamos el form
            this.form = this.formBuilder.group(form);
        }
        else{
            // Filtramos las confirmadas por defecto
            this.form = this.formBuilder.group({...form, estado: [{id:1}]});
            // Sino aplicamos por defecto el filtro por periodo (el ultimo)
            // Si es necesario este ordenamiento por default, descomentar.
            // this.periodoOpciones$.subscribe(
            //     periodos => {
            //         this.periodo = periodos.length? {_id: periodos[0]._id}: null;
            //         this.form = this.formBuilder.group({...form, periodo: [this.periodo] });
            //     }
            // );    
        }

    }

    public async buscar($event?) {
        // Error en Plex, ejecuta un change cuando el input pierde el
        // foco porque detecta que cambia el valor
        if ($event && $event.type) {
            return;
        }

        // Cancela la búsqueda anterior
        if (this.timeoutHandle) {
            window.clearTimeout(this.timeoutHandle);
        }
        // Recuperamos filtros aplicados
        let searchParams = this.prepareSearchParams();
        // Actualizamos la url para mantener el estado de los filtros
        this.applyFilterToRoute();
        // Realizamos la nueva busqueda
        this.timeoutHandle = window.setTimeout(() => {
            this.searchStart.emit();
            this.timeoutHandle = null;
            this.search(searchParams);
        }, 1000);    
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
                    estado: (form.estado)? form.estado.id:null,
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
     * Caso contrario solo puede visualizar las guardias de su servicio/s. Este
     * metodo debe ser llamado luego de haber determinado si el usuario puede
     * procesar una guardia.
     */
    async getServiciosAllowed(){
        if (this.serviciosAllowed) return this.serviciosAllowed;
        
        this.serviciosAllowed = (!this.canProcesarGuardia)? this.authService.servicios: [];
        return this.serviciosAllowed;
    }

    prepareSearchParams(){
        let params:any = {};
        if (this.searchForm.valid){
            let form = this.searchForm.value;
            if (form.estado){ 
                params['estado'] = form.estado.id;
            }
            if (form.periodo){
                params['periodo._id'] = form.periodo._id;
            }

            if (form.servicio){
                params['lote.servicio._id'] = form.servicio._id
            }
            else{
                if (!this.canProcesarGuardia){
                    // Debe ser un jefe de servicio
                    if (this.serviciosAllowed && this.serviciosAllowed.length) {
                        params['lote.servicio._id'] = this.serviciosAllowed.map(i=>i._id);
                    }
                    else{
                        // Si el jefe de servicio no tiene servicios asignados entonces
                        // simulamos una consulta fallida, para no recuperar datos. 
                        // TODO Proteger desde el back para mayor seguridad
                        params['lote.servicio._id'] = -99;
                    }
                }
                
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
