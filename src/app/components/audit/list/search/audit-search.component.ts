
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-audit-search',
    templateUrl: 'audit-search.html',
})
export class AuditSearchComponent extends ABMSearchComponent {
    
    public activoOpciones;

    public _model: String = "";
    public _objectID: String = "";


    constructor(protected formBuilder: FormBuilder,
        protected route: ActivatedRoute) {
        super(formBuilder)
    }


    public ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this._model = params.get("model");
            this._objectID = params.get("id");
            this.search();
        });
    }

    get searchFilterFormParameters(){
        return {
                model: this._model,
                id: this._objectID
            }
    }

}
