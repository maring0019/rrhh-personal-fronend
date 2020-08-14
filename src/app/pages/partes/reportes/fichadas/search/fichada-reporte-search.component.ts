import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';

import { ParteService } from 'src/app/services/parte.service';

@Component({
    selector: 'app-fichada-reporte-search-form',
    templateUrl: 'fichada-reporte-search.html',
})
export class FichadaReporteSearchFormComponent extends CRUDSearchFormComponent implements OnInit, AfterViewInit, OnDestroy {

    
    constructor(
        formBuilder: FormBuilder,
        private objectService: ParteService) {
            super(formBuilder);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngAfterViewInit(){
        // Parche para visualizar correctamente la fecha en el reactive form
        window.setTimeout(() => {
            if (this.searchForm){
                this.searchForm.patchValue({ 
                    fechaDesde: this.searchForm.value.fechaDesde,
                    fechaHasta: this.searchForm.value.fechaHasta,
                 })
            }
        }, 1000);
    }

    ngOnDestroy(){
        super.ngOnDestroy();
    }

    initFormSelectOptions(){}

    initSearchForm(){
        return this.formBuilder.group({
            fechaDesde  : [ moment().subtract(2, 'days').toDate()],
            fechaHasta  : [ moment().add(1, 'days').toDate()],
            ubicacion   : [],
            agente      : []
        });
    }


    prepareSearchParams(){
        let params:any = {};
        if (this.searchForm.valid){
            let form = this.searchForm.value;
            if (form.fechaDesde){
                params['fecha>'] = form.fechaDesde;
            }
            if (form.fechaHasta){
                params['fecha<'] = form.fechaHasta;
            }
            if (form.ubicacion){
                params['ubicacion'] = form.ubicacion.codigo;
            }
            if (form.agente){
                params['agente._id'] = form.agente._id;
            }
        }
        return params;
    }


    search(searchParams){
        if (this.searchForm.valid){
            this.objectService.getFichadasAgentesReporte(searchParams).subscribe(
                objects => {
                    this.searchEnd.emit(objects);
                },
                (err) => {
                    this.searchEnd.emit([])
                }
            );
        }
        else{
            this.searchEnd.emit([])
        }
    }
}
