
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';

@Component({
    selector: 'app-rol-search',
    templateUrl: 'rol-search.html',
})
export class RolSearchComponent extends ABMSearchComponent { 

    constructor(protected formBuilder: FormBuilder) {
        super(formBuilder)
    }

}
