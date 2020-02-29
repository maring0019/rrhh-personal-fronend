import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    selector: 'app-guardia-lotes-search',
    templateUrl: 'guardia-lotes-search.html',
})
export class GuardiaLotesSearchComponent implements OnInit {
    
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    
    public searchFieldParams:any;
    
    //Search form and form options
    public searchForm: FormGroup;
    public requiereVencimientoOpciones; 

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.initFormSelectOptions();
        this.initSearchForm();
    }

    private initFormSelectOptions(){ // Changed
    }

    private initSearchForm(){ // Changed
        this.searchForm = this.formBuilder.group({});
    }

    public onChangeSearch(){
        const searchParams = this.prepareSearchParams();
        this.change.emit(searchParams);
    }

    public onChangeSearchField(searchParams){
        this.searchFieldParams = searchParams;
        this.onChangeSearch();
    }

    public prepareSearchParams(){ // Changed
        let params:any = {};
        // Sorting
        params['sort'] = 'nombre';
        // Objeto final de busqueda (searchField + searchFilters)
        params = {...this.searchFieldParams,...params};
        return params;
    }
}

