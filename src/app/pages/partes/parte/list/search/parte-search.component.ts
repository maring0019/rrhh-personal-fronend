import { ActivatedRoute, Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';
import { ParteEstadoService } from 'src/app/services/parte-estado.service';
import { parseStrToDate } from 'src/app/utils/dates';

@Component({
    selector: 'app-parte-search-form',
    templateUrl: 'parte-search.html',
})
export class ParteSearchFormComponent extends ABMSearchComponent implements AfterViewInit{

    //Search form options
    public procesadoOpciones;
    public parteEstadoOpciones$ = this.parteEstadoService.get({});

    // Default search form values. Se usa en conjunto con los queryParams
    // para preservar las busquedas previas cuando se navega hacia atras
    public fechaDesde = moment().subtract(2, 'days').toDate();
    public fechaHasta = new Date();
    public estado;
    public procesado;
    public ubicacion;


    constructor(
            protected formBuilder: FormBuilder,
            private parteEstadoService: ParteEstadoService,
            private activatedRoute: ActivatedRoute,
            private router: Router) {
        super(formBuilder);
        // Intentamos recuperar cualquier queryparam existente previo para
        // inicializar el form de busqueda y aplicar los filtros al ingresar
        // al ingresar a la pagina
        const queryParams = this.activatedRoute.snapshot.queryParams;
        this.fechaDesde =  parseStrToDate(queryParams.fechaDesde, this.fechaDesde);
        this.fechaHasta = parseStrToDate(queryParams.fechaHasta, this.fechaHasta);
        this.estado = (queryParams.estado)? {_id: queryParams.estado} : null;
        this.procesado = (queryParams.procesado)? {id: queryParams.procesado} : null;
        if (queryParams.ubicacion && queryParams.ubicacionCodigo){
            this.ubicacion = {_id:queryParams.ubicacion, codigo: queryParams.ubicacionCodigo}
        }
    }

    ngAfterViewInit(){
        // No utilizamos la utilidad patchFormDates porque necesitamos ejecutar posteriormente una busqueda
        window.setTimeout(() => {
            if (this.filterForm){
                this.filterForm.patchValue({ 
                    fechaDesde: this.filterForm.value.fechaDesde,
                    fechaHasta: this.filterForm.value.fechaHasta,
                    })
                this.search();
            }
        }, 1000);
    }

    initFilterFormSelectOptions(){
        this.procesadoOpciones = [{id:'si', nombre:'Si'}, {id:'no', nombre:'No'}];
    }

    initFilterForm(){
        this.filterForm = this.formBuilder.group({
            fechaDesde  : [ this.fechaDesde ],
            fechaHasta  : [ this.fechaHasta ],
            estado      : [ this.estado ],
            procesado   : [ this.procesado ],
            ubicacion   : [ this.ubicacion ]
        });
    }

    get searchFilterFormParameters(){
        let params:any = {};
        if (this.filterForm.valid){
            let form = this.filterForm.value;
            if (form.fechaDesde){
                params['fecha>'] = form.fechaDesde;
            }
            if (form.fechaHasta){
                params['fecha<'] = form.fechaHasta;
            }
            if (form.estado){   // Filtro por estado del parte
                params['estado._id'] = form.estado._id;
            }
            if (form.procesado){
                if (form.procesado.id == 'si'){
                    params['procesado'] = true;
                }
                else{
                    params['procesado!'] = true;
                }
            }
            if (form.ubicacion){
                params['ubicacion.codigo'] = form.ubicacion.codigo;
            }
            // Sorting
            params['sort'] = '-fecha';
        }
        return params;
    }

    protected applyFilterToRoute() {
        const form = this.filterForm.value;
		this.router.navigate(
			['/partes/recibidos',],
			{
                queryParams: {
                    fechaDesde: parseStrToDate(form.fechaDesde),
                    fechaHasta: parseStrToDate(form.fechaHasta),
                    estado: (form.estado)? form.estado._id: null,
                    procesado: (form.procesado)? form.procesado.id:null,
                    ubicacion: (form.ubicacion)? form.ubicacion._id:null,
                    ubicacionCodigo:  (form.ubicacion)? form.ubicacion.codigo:null},
				relativeTo: this.activatedRoute,
				// NOTE: By using the replaceUrl option, we don't increase the Browser's
				// history depth with every filtering keystroke. 
				replaceUrl: true
			}
		);
	}
}