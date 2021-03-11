import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';

@Component({
    selector: 'app-subpuesto-search',
    templateUrl: 'subpuesto-search.html',
})
export class SubPuestoSearchComponent extends ABMSearchComponent {

    constructor(protected formBuilder: FormBuilder) {
        super(formBuilder)
    }

}
