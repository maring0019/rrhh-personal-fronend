import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';
import { ArticuloService } from 'src/app/services/articulo.service';


@Component({
    selector: 'app-articulo-search-form',
    templateUrl: 'articulo-search.html',
})
export class ArticuloSearchFormComponent extends CRUDSearchFormComponent implements OnInit, OnDestroy {

    //Search form options
    public opcionesSiNo;
    // public descuentaDiasOpciones;

    constructor(
        formBuilder: FormBuilder,
        private objectService: ArticuloService) {
            super(formBuilder);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(){
        super.ngOnDestroy();
    }

    initFormSelectOptions(){
        this.opcionesSiNo = [{id:'si', nombre:'Si'}, {id:'no', nombre:'No'}];
        // this.descuentaLicenciasOpciones = opcionesSiNo;
    }

    initSearchForm(){
        return this.formBuilder.group({
            textoLibre            : [],
            descuentaDiasLicencia : []
        });
    }

    prepareSearchParams(){
        let params:any = {};
        let form = this.searchForm.value;
        if (form.textoLibre && form.textoLibre.length >= 4){
            const exp = form.textoLibre;
            params['filter'] = JSON.stringify(
                {"$or":[
                    {"nombre"      :{"$regex": exp, "$options":"i"}},
                    {"codigo"      :{"$regex": exp, "$options":"i"}},
                    {"descripcion" :{"$regex": exp, "$options":"i"}},
                ]}) 
        }
        if (form.descuentaDiasLicencia){
            if (form.descuentaDiasLicencia.id == 'si'){
                params['descuentaDiasLicencia'] = true;
            }
            else{
                params['descuentaDiasLicencia!'] = true;
            }
        }
        // Sorting
        params['sort'] = 'codigo';      
        return params;
    }

    search(searchParams){
        this.objectService.get(searchParams).subscribe(
            objects => {
                this.searchEnd.emit(objects);
            },
            (err) => {
                this.searchEnd.emit([])
            }
        );
    }

}
