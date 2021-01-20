import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';

@Component({
    selector: 'app-usuario-search',
    templateUrl: 'usuario-search.html',
})
export class UsuarioSearchComponent extends ABMSearchComponent { 

    constructor(protected formBuilder: FormBuilder) {
        super(formBuilder)
    }

}
