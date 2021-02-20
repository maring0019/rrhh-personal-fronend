import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';

@Component({
    selector: 'app-recargo-justificacion-search',
    templateUrl: 'recargo-justificacion-search.html',
})
export class RecargoJustificacionSearchComponent extends ABMSearchComponent {

    constructor(protected formBuilder: FormBuilder) {
        super(formBuilder)
    }

}
