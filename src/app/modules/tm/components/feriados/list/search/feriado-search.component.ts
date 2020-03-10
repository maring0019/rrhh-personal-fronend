import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';

@Component({
    selector: 'app-feriado-search',
    templateUrl: 'feriado-search.html',
})
export class FeriadoSearchComponent extends ABMSearchComponent {

    constructor(protected formBuilder: FormBuilder) {
        super(formBuilder)
    }
}