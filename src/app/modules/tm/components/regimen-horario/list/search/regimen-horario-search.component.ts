import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';



@Component({
    selector: 'app-regimen-horario-search',
    templateUrl: 'regimen-horario-search.html',
})
export class RegimenHorarioSearchComponent extends ABMSearchComponent {
    
    public activoOpciones; 

    constructor(protected formBuilder: FormBuilder) {
        super(formBuilder)
    }

    protected initFilterFormSelectOptions(){
        this.activoOpciones =[{id:'si', nombre:'Si'}, {id:'no', nombre:'No'}];
    }

    protected initFilterForm(){
        this.filterForm = this.formBuilder.group({
            activo : []
        });
    }

    protected get filterParameters(){
        let params:any = {};
        let form = this.filterForm.value;
        if (form.activo){
            if (form.activo.id == 'si'){
                params['activo'] = true;
            }
            else{
                params['activo!'] = true;
            }
        }
        // Sorting
        params['sort'] = 'nombre';
        return params;
    }

}
