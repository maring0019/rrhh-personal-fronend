
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';

@Component({
    selector: 'app-licencia-periodo-search',
    templateUrl: 'licencia-periodo-search.html',
})
export class LicenciaPeriodoSearchComponent extends ABMSearchComponent {
    
    public autoFocus = 0;
    public searchText:String;  // User input value
    private searchExpresion:any;

    constructor(protected formBuilder: FormBuilder) {
        super(formBuilder)
    }

    ngOnInit() {
        this.autoFocus = this.autoFocus + 1;
    }

    public onChange(){
        this.searchExpresion = {};
        let textoLibre = this.searchText? this.searchText.trim(): "";
        if (textoLibre && textoLibre.length >= 3){
            const searchTerms = textoLibre.split(" ");
            let andFilters = [];
            for (let exp of searchTerms) {
                const orFilters = {"$or":[
                    {"agente.nombre"   :{"$regex": `${exp}`, "$options":"i"}},
                    {"agente.apellido" :{"$regex": `^${exp}`, "$options":"i"}},
                    {"agente.documento":{"$regex": `^${exp}`, "$options":"i"}},
                    {"agente.numero"   :{"$regex": `^${exp}`, "$options":"i"}},
                ]}
                andFilters.push(orFilters);
            }
            this.searchExpresion['filter'] = JSON.stringify({"$and" : andFilters})
        }
        this.change.emit(this.searchExpresion);
    }
}