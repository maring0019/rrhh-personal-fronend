import { OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


export abstract class ABMSearchComponent implements OnInit {
    
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    
    public searchFieldParams:any;
    
    //Filter form
    public filterForm: FormGroup;

    constructor(protected formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.initFilterFormSelectOptions();
        this.initFilterForm();
    }

    protected initFilterFormSelectOptions(){}

    protected initFilterForm(){
        this.filterForm = this.formBuilder.group({});
    }

    protected prepareSearchParams(){
        let params = this.filterParameters;
        // Objeto final de busqueda (searchField + searchFilters)
        params = {...this.searchFieldParams,...params};
        return params;
    }

    protected get filterParameters(){
        return {};
    }

    public onChangeSearch(){
        const searchParams = this.prepareSearchParams();
        this.change.emit(searchParams);
    }

    public onChangeSearchField(searchParams){
        this.searchFieldParams = searchParams;
        this.onChangeSearch();
    }

}
