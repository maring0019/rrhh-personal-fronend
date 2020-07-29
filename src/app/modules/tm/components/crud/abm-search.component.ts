import { OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


/**
 * Conjunto de metodos comunes a todas las busquedas que se
 * realizan en un ABM simple.
 */
export abstract class ABMSearchComponent implements OnInit {
      
    /**
     * Notifica los parametros de busqueda ingresados hacia el 
     * exterior cuando se produce algun cambio en los mismos.
     * Los parametros incluyen la cadena de texto ingresada y
     * cualquier otro filtro extra aplicado.
     */
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    
    // Almacena un objeto json con la expresion de busqueda
    // a aplicar sobre la cadena ingresada.
    public searchTextFieldParameters:any;

    public mostrarMasOpciones: Boolean = false;
    
    // Almacena un objeto json con los filtros a aplicar en las
    // busquedas. Los filtros son opcionales.
    // Las clases concretas que requieran filtros deberán proveer
    // los mismos a traves de un formulario y deberan implementar
    // el metodo get searchFilterFormParameters(){} para armar el 
    // objeto json correspondiente
    protected get searchFilterFormParameters(){ return {}}; 
    
    public filterForm: FormGroup;

    constructor(protected formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.initFilterFormSelectOptions(); // Opcional
        this.initFilterForm();              // Opcional
    }

    /**
     * Hook para realizar tareas de inicializacion 
     * para los filtros de busqueda del formulario
     */
    protected initFilterFormSelectOptions(){}

    
    /**
     * Hook para inicializar un formulario con 
     * filtros para las busquedas. Por default
     * crea un formulario vacio sin campos.
     */
    protected initFilterForm(){
        this.filterForm = this.formBuilder.group({});
    }

    protected prepareSearchParams(){
        let params = this.searchFilterFormParameters; // Hook para personalizar los filtros 
        // Objeto final de busqueda (searchField + searchFilters)
        params = {...this.searchTextFieldParameters,...params};
        return params;
    }

   
    public search(){
        const searchParams = this.prepareSearchParams();
        this.change.emit(searchParams);
    }

    public onChangeSearchField(searchParams){
        this.searchTextFieldParameters = searchParams;
        this.search();
    }
}
