import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';
import { getAgenteSearchParams } from 'src/app/utils/searchUtils';

@Component({
    selector: 'app-agente-multiple-search-form',
    templateUrl: 'agente-multiple-search-form.html',
})
export class AgenteMultipleSearchFormComponent extends ABMSearchComponent {

    constructor(protected formBuilder: FormBuilder) {
        super(formBuilder)
    }

    protected initFilterForm(){
        this.filterForm = this.formBuilder.group({
            searchText  : [],
        });
    }

    protected prepareSearchParams(){
        // let params = this.searchFilterFormParameters; // Hook para personalizar los filtros. See get searchFilterFormParameters..
        // // Objeto final de busqueda (searchField + searchFilters)
        // params = {...this.searchTextFieldParameters,...params};
        // return params;
        
        let params:any = {};
        let form = this.filterForm.value;
        let textoLibre = form.searchText? form.searchText.trim(): "";
        params = getAgenteSearchParams(params, textoLibre);
        return params;        
    }

    
}