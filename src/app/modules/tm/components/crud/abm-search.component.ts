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
        let params = this.searchFilterFormParameters; // Hook para personalizar los filtros. See get searchFilterFormParameters..
        // Objeto final de busqueda (searchField + searchFilters)
        params = {...this.searchTextFieldParameters,...params};
        return params;
    }

    /**
     * Hook para actualizar los query params de la URL actual. Es un intento
     * por preservar en la URL los filtros aplicados en el form de busqueda.
     * De esta forma cuando se navega de  nuevo hacia la pagina de busqueda,
     * es posible recuperar los parametros aplicados previamente y aplicarlos
     * al formulario. Es decir simulamos mantener la busqueda previamente realizada.
     * En el sistema existen varios ejemplos de uso. Ver por ejemplo el componente
     * ParteSearchFormComponent
     */
    protected applyFilterToRoute() {}

   
    /**
     * Este metodo define el ciclo de ejecucion principal de una busqueda. Basicamente
     * se aplica en tres pasos. Cada paso se puede personalizar por completo realizando
     * un override del metodo, o bien es posible realizar pequeñas adaptaciones utilizando
     * los 'hooks' provistos para tal fin.
     * Algo importante a tener en cuenta es que la busqueda no se realiza aqui. El 
     * componente solo es responsable de recuperar todos los filtros de busqueda y emitir
     * un objeto json con los mismos.  
     */
    public search(){
        // Paso 1. Preparacion de los filtros/parametros de busqueda
        const searchParams = this.prepareSearchParams();
        // Paso 2. Opcional. Ver uso para preservar filtros de busquedas en las urls
        this.applyFilterToRoute();
        // Paso 3. Emision de los filtros/parametros aplicados
        this.change.emit(searchParams);
    }

    public onChangeSearchField(searchParams){
        this.searchTextFieldParameters = searchParams;
        this.search();
    }
}
