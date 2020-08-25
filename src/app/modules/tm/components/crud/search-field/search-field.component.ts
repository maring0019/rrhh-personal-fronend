import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search-field',
    templateUrl: './search-field.html',
    
})
export class SearchFieldComponent {

    @Input() hasFilters:Boolean;
    @Input() searchFields:string[] = ["nombre"];
    
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    
    public autoFocus = 0;
    public searchText:String;  // User input value
    
    private searchExpresion:any;
    
    public onChange(){
        this.searchExpresion = {};
        let textoLibre = (this.searchText)? this.searchText.trim():"";
        if (textoLibre && textoLibre.length >= 4){
            const exps = textoLibre.split(" ");
            let andFilters = [];
            for (let exp of exps) {
                let searchExpressions = [];
                for (const searchFieldName of this.searchFields) {
                    searchExpressions.push({ [searchFieldName] : {"$regex": exp, "$options":"i"}})
                }
                const orFilters = { "$or": searchExpressions };
                andFilters.push(orFilters);
            }
            
            this.searchExpresion['filter'] = JSON.stringify({"$and" : andFilters})

            // let searchExpressions = [];
            // for (const searchFieldName of this.searchFields) {
            //     searchExpressions.push({ [searchFieldName] :{"$regex": this.searchText, "$options":"i"}})
            // }
            // if (searchExpressions.length == 1) {
            //     this.searchExpresion['filter'] = JSON.stringify(searchExpressions[0]); 
            // }
            // else{
            //     this.searchExpresion['filter'] = JSON.stringify(
            //         {"$or": searchExpressions }) 
            // }    
        }
        this.change.emit(this.searchExpresion);
    }

}

