import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';
import { ParteEstadoService } from 'src/app/services/parte-estado.service';

@Component({
    selector: 'app-parte-search-form',
    templateUrl: 'parte-search.html',
})
export class ParteSearchFormComponent extends ABMSearchComponent implements AfterViewInit{

    //Search form options
    public procesadoOpciones;
    public parteEstadoOpciones$ = this.parteEstadoService.get({});

    constructor(protected formBuilder: FormBuilder,
            private parteEstadoService: ParteEstadoService) {
        super(formBuilder)
    }

    ngAfterViewInit(){
        // Parche para visualizar correctamente la fecha en el reactive form
        window.setTimeout(() => {
            if (this.filterForm){
                this.filterForm.patchValue({ 
                    fechaDesde: this.filterForm.value.fechaDesde,
                    fechaHasta: this.filterForm.value.fechaHasta,
                    })
                this.search();
            }
        }, 1000);
    }

    initFilterFormSelectOptions(){
        this.procesadoOpciones = [{id:'si', nombre:'Si'}, {id:'no', nombre:'No'}];
    }

    initFilterForm(){
        this.filterForm = this.formBuilder.group({
            fechaDesde  : [ moment().subtract(2, 'days').toDate()],
            fechaHasta  : [ new Date()],
            estado      : [],
            procesado   : [],
            ubicacion   : []
        });
    }

    get searchFilterFormParameters(){
        let params:any = {};
        if (this.filterForm.valid){
            let form = this.filterForm.value;
            if (form.fechaDesde){
                params['fecha>'] = form.fechaDesde;
            }
            if (form.fechaHasta){
                params['fecha<'] = form.fechaHasta;
            }
            if (form.estado){   // Filtro por estado del parte
                params['estado._id'] = form.estado._id;
            }
            if (form.procesado){
                if (form.procesado.id == 'si'){
                    params['procesado'] = true;
                }
                else{
                    params['procesado!'] = true;
                }
            }
            if (form.ubicacion){
                params['ubicacion.codigo'] = form.ubicacion.codigo;
            }
            // Sorting
            params['sort'] = '-fecha';
        }
        return params;
    }
}