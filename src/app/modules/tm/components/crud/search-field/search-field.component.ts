import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search-field',
    templateUrl: './search-field.html',
    
})
export class SearchFieldComponent {

    @Input() hasFilters:Boolean;
    @Input() searchFields:string[] = ["nombre"];
    
    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    public searchText:String;
    
    private searchExpresion:any;
    
    public onChange(){
        this.searchExpresion = {};
        if (this.searchText && this.searchText.length >= 4){
            let searchExpressions = [];
            for (const searchFieldName of this.searchFields) {
                searchExpressions.push({ [searchFieldName] :{"$regex": this.searchText, "$options":"i"}})
            }
            if (searchExpressions.length == 1) {
                this.searchExpresion['filter'] = JSON.stringify(searchExpressions[0]); 
            }
            else{
                this.searchExpresion['filter'] = JSON.stringify(
                    {"$or": searchExpressions }) 
            }    
        }
        this.change.emit(this.searchExpresion);
    }

}

