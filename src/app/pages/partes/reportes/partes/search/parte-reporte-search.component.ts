import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';

import { ParteService } from 'src/app/services/parte.service';
import { AgenteService } from 'src/app/services/agente.service';
import { Agente } from 'src/app/models/Agente';


@Component({
    selector: 'app-parte-reporte-search-form',
    templateUrl: 'parte-reporte-search.html',
})
export class ParteReporteSearchFormComponent extends CRUDSearchFormComponent implements OnInit, AfterViewInit, OnDestroy {

    private timeoutHandler: number;
    //Search form options
    public agenteOpciones: Agente[] = []; 

    constructor(
        formBuilder: FormBuilder,
        private objectService: ParteService,
        private agenteService: AgenteService) {
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
        // this.agenteService.get({})
        //     .subscribe(data => {
        //         this.agenteOpciones = data;
        // });
    }

    initSearchForm(){
        return this.formBuilder.group({
            fechaDesde  : [ moment().subtract(2, 'days').toDate()],
            fechaHasta  : [ new Date()],
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
            if (form.agente){
                params['agente._id'] = form.agente._id;
            }
        }
        return params;
    }


    search(searchParams){
        if (this.searchForm.valid){
            this.objectService.getPartesAgenteReporte(searchParams).subscribe(
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

    public onSearchAgentes(event){
        if (event && event.query && event.query.length >= 4) {
            // Cancela la búsqueda anterior
            if (this.timeoutHandler) {
                window.clearTimeout(this.timeoutHandler);
            }
            this.timeoutHandler = window.setTimeout(() => {
                this.timeoutHandler = null;
                this.agenteService.filter(event.query).subscribe(
                    (agentes) => {
                        event.callback(agentes);
                    },
                    (err) => {
                        event.callback([]);
                    });
            }, 1000);
        
        }
        else {    
            event.callback([]);
        }
    }
}
