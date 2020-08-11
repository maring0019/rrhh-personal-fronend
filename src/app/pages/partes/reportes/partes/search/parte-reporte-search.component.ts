import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ABMSearchComponent } from 'src/app/modules/tm/components/crud/abm-search.component';


@Component({
    selector: 'app-parte-reporte-search-form',
    templateUrl: 'parte-reporte-search.html',
})
export class ParteReporteSearchFormComponent extends ABMSearchComponent implements AfterViewInit {

    constructor(protected formBuilder: FormBuilder) {
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
            }
        }, 1000);
    }


    initFilterForm(){
        this.filterForm = this.formBuilder.group({
            fechaDesde  : [ moment().subtract(2, 'days').toDate()],
            fechaHasta  : [ new Date()],
            agente      : []
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
            if (form.agente){
                params['agente._id'] = form.agente._id;
            }
        }
        return params;
    }
}
