import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    selector: 'app-situacion-search-form',
    templateUrl: 'situacion-search.html',
})
export class SituacionSearchFormComponent implements OnInit {
    
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

    private initFormSelectOptions(){
        this.requiereVencimientoOpciones =[{id:'si', nombre:'Si'}, {id:'no', nombre:'No'}];
    }

    private initSearchForm(){
        this.searchForm = this.formBuilder.group({
            requiereVencimiento : []
        });
    }

    public onChangeSearch(){
        const searchParams = this.prepareSearchParams();
        this.change.emit(searchParams);
    }

    public onChangeSearchField(searchParams){
        this.searchFieldParams = searchParams;
        this.onChangeSearch();
    }

    public prepareSearchParams(){
        let params:any = {};
        let form = this.searchForm.value;
        if (form.requiereVencimiento){
            if (form.requiereVencimiento.id == 'si'){
                params['requiereVencimiento'] = true;
            }
            else{
                params['requiereVencimiento!'] = true;
            }
        }
        // Sorting
        params['sort'] = 'nombre';
        // Objeto final de busqueda (searchField + searchFilters)
        params = {...this.searchFieldParams,...params};
        return params;
    }

}
