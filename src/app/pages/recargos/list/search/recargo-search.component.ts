import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';

import { Auth } from 'src/app/services/auth.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { getMesesOptions, getAniosOptions } from 'src/app/models/enumerados';


@Component({
    selector: 'app-recargo-search-form',
    templateUrl: 'recargo-search.html',
})
export class RecargoSearchFormComponent extends ABMSearchComponent{

    // Search form select options
    public anioOpciones = getAniosOptions();
    public mesOpciones = getMesesOptions();
    public servicioOpciones = [];
    public estadoOpciones = [];
    public serviciosAllowed; // Id de los servicios del jefe de servicio

    // Default search form values. Se usa en conjunto con los queryParams
    // para preservar las busquedas previas cuando se navega hacia atras
    public anio;
    public mes;
    public servicio;
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
    public canProcesarRecargo:Boolean = false;

    
    constructor(protected formBuilder: FormBuilder,
                private authService: Auth,
                private ubicacionService: UbicacionService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
       super(formBuilder);
        // Intentamos recuperar cualquier queryparam existente previo para
        // inicializar el form de busqueda y aplicar los filtros al ingresar
        // al ingresar a la pagina
        const queryParams = this.activatedRoute.snapshot.queryParams;
        this.anio =  (queryParams.anio)? {id: queryParams.anio} : null;
        this.mes = (queryParams.mes)? {id: queryParams.mes} : null;
        this.estado = (queryParams.estado)? {id: queryParams.estado} : null;
        this.servicio = (queryParams.servicio)? {_id:queryParams.servicio}: null;
    }

    public async ngOnInit() {
        this.canProcesarRecargo = await this.authService.check('recargos:recargo:procesar_recargo');
        this.getServiciosAllowed();
        this.initFilterFormSelectOptions();
        this.initFilterForm();

        // Cuando este disponible el formulario comenzamos el proceso de busqueda
        this.form$.subscribe(data => { 
            if (data) {
                this.filterForm = data;
                this.search();
            }
        } );
    }

    /**
     * Si el usuario tiene otorgado el permiso para procesar guardias, entonces
     * esta autorizado a visualizar todas las guardias de todos los servicios.
     * Caso contrario solo puede visualizar las guardias de su servicio/s. Este
     * metodo debe ser llamado luego de haber determinado si el usuario puede
     * procesar una guardia.
     */
    getServiciosAllowed(){
        if (this.serviciosAllowed) return this.serviciosAllowed;
        
        this.serviciosAllowed = (!this.canProcesarRecargo)? this.authService.servicios: [];
        return this.serviciosAllowed;
    }

    initFilterFormSelectOptions(){
        this.estadoOpciones = [
            { id: 0, nombre: 'Sin Confirmar' },
            { id: 1, nombre: 'Confirmada'},
            { id: 2, nombre: 'Parcialmente Procesada'},
            { id: 3, nombre: 'Procesada'}
        ]

        if (this.canProcesarRecargo){
            this.ubicacionService.get({}).subscribe(servicios =>
                this.servicioOpciones = servicios)
        }
        
        if (this.serviciosAllowed && this.serviciosAllowed.length){
            this.servicioOpciones = this.serviciosAllowed;
        }        
    }


    initFilterForm(){
        let form = {
            mes       : [this.mes],
            anio      : [this.anio],
            servicio  : [this.servicio],
            estado    : [this.estado]
        }

        if (this.mes || this.anio || this.servicio || this.estado){
            // Si se aplicó algun filtro previamente no modificamos el form
            this.form = this.formBuilder.group(form);
        }
        else{
            // Filtramos las confirmadas por defecto
            this.form = this.formBuilder.group({...form, estado: [{id:1}]});
        }
    }

    applyFilterToRoute() {
        const form = this.filterForm.value;
		this.router.navigate(
			['/recargos',],
			{
                queryParams: {
                    mes: (form.mes)? form.mes.id:null,
                    anio: (form.anio)? form.anio.id:null,
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
    
    get searchFilterFormParameters(){ 
        let params:any = {};
        if (this.filterForm.valid){
            let form = this.filterForm.value;
            if (form.estado){ 
                params['estado'] = form.estado.id;
            }
            if (form.mes){
                params['mes.id'] = form.mes.id;
            }
            if (form.anio){
                params['anio'] = form.anio.id;
            }

            if (form.servicio){
                params['servicio._id'] = form.servicio._id
            }
            else{
                if (!this.canProcesarRecargo){
                    // Debe ser un jefe de servicio
                    if (this.serviciosAllowed && this.serviciosAllowed.length) {
                        params['servicio._id'] = this.serviciosAllowed.map(i=>i._id);
                    }
                    else{
                        // Si el jefe de servicio no tiene servicios asignados entonces
                        // simulamos una consulta fallida, para no recuperar datos. 
                        // TODO Proteger desde el back para mayor seguridad
                        params['servicio._id'] = -99;
                    }
                }
                
            }
            // Sorting
            // params['sort'] = '-fechaEntrega';
        }
        return params;
    }; 

}