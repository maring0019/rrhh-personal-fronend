import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';

import { ParteService } from 'src/app/services/parte.service';
import { ParteEstadoService } from 'src/app/services/parte-estado.service';


@Component({
    selector: 'app-parte-search-form',
    templateUrl: 'parte-search.html',
})
export class ParteSearchFormComponent extends CRUDSearchFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //Search form options
    public procesadoOpciones;
    public parteEstadoOpciones$ = this.parteEstadoService.get({});

    constructor(
        formBuilder: FormBuilder,
        private objectService: ParteService,
        private parteEstadoService: ParteEstadoService) {
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

    initFormSelectOptions(){
        this.procesadoOpciones = [{id:'si', nombre:'Si'}, {id:'no', nombre:'No'}];
    }

    initSearchForm(){
        return this.formBuilder.group({
            fechaDesde  : [ moment().subtract(2, 'days').toDate()],
            fechaHasta  : [ new Date()],
            estado      : [],
            procesado   : [],
            ubicacion   : []
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
            if (form.estado){   // Filtro por estado del parte
                params['estado.id'] = form.estado.id;
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
                params['ubicacion.id'] = form.ubicacion.id;
            }
            // Sorting
            params['sort'] = '-fecha';
        }
        return params;
    }

    search(searchParams){
        // if (this.searchForm.valid){
            this.objectService.get(searchParams).subscribe(
                objects => {
                    this.searchEnd.emit(objects);
                },
                (err) => {
                    this.searchEnd.emit([])
                }
            );
        // }
    }

}
