import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TipoSituacionService } from 'src/app/services/tm/situacion.service';
import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';


@Component({
    selector: 'app-situacion-search-form',
    templateUrl: 'situacion-search.html',
})
export class SituacionSearchFormComponent implements OnInit, OnDestroy {

    public searchForm: FormGroup;
    //Search form options
    public requiereVencimientoOpciones; 

    constructor(
        private formBuilder: FormBuilder,
        private objectService: TipoSituacionService) {

    }

    ngOnInit() {
     
    }

    ngOnDestroy(){
     
    }

    initFormSelectOptions(){
        this.requiereVencimientoOpciones =[{id:'si', nombre:'Si'}, {id:'no', nombre:'No'}];
    }

    initSearchForm(){
        return this.formBuilder.group({
            textoLibre          : [],
            requiereVencimiento : []
        });
    }

    prepareSearchParams(){
        let params:any = {};
        let form = this.searchForm.value;
        if (form.textoLibre && form.textoLibre.length >= 4){
            const exp = form.textoLibre;
            params['filter'] = JSON.stringify({"nombre":{"$regex": exp, "$options":"i"}}) 
        }
        if (form.requiereVencimiento){
            if (form.requiereVencimiento.id == 'si'){
                params['requiereVencimiento'] = true;
            }
            else{
                params['requiereVencimiento!'] = true;
            }
        }
        // Sorting
        params['sort'] = 'nombre';      
        return params;
    }

}
