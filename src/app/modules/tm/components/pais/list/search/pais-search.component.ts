import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';

@Component({
    selector: 'app-pais-search',
    templateUrl: 'pais-search.html',
})
export class PaisSearchComponent extends ABMSearchComponent {

    constructor(protected formBuilder: FormBuilder) {
        super(formBuilder)
    }

}
