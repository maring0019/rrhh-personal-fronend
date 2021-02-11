import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';

import * as enumerados from 'src/app/models/enumerados';
import { GuardiaService } from 'src/app/services/guardia.service';
import { AgrupamientoService } from 'src/app/services/agrupamiento.service';
import { GuardiaPeriodoService } from 'src/app/services/guardia-periodo.service';
import { Auth } from 'src/app/services/auth.service';


@Component({
    selector: 'app-guardia-search-form',
    templateUrl: 'guardia-search-form.html',
})
export class GuardiaSearchFormComponent extends CRUDSearchFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //Search form options
    public tipoGuardiaOpciones = enumerados.getObjTipos(enumerados.TipoGuardia);
    public periodoOpciones$ = this.guardiaPeriodoService.get({});
    public servicioOpciones = this.authService.servicios;
    public categoriaOpciones$ = this.categoriaService.get({});
    

    constructor(
        formBuilder: FormBuilder,
        private objectService: GuardiaService,
        private authService: Auth,
        private categoriaService: AgrupamientoService,
        private guardiaPeriodoService: GuardiaPeriodoService) {
            super(formBuilder);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngAfterViewInit(){
    }

    ngOnDestroy(){
        super.ngOnDestroy();
    }

    initFormSelectOptions(){

    }

    initSearchForm(){
        return this.formBuilder.group({
            periodo         : [],
            servicio        : [],
            categoria       : [],
            tipoGuardia     : []
        });
    }

    prepareSearchParams(){
        let params:any = {};
        if (this.searchForm.valid){
            let form = this.searchForm.value;
            // if (form.estado){   // Filtro por estado del parte
            //     params['estado.id'] = form.estado.id;
            // }
            // if (form.procesado){
            //     if (form.procesado.id == 'si'){
            //         params['procesado'] = true;
            //     }
            //     else{
            //         params['procesado!'] = true;
            //     }
            // }
            if (form.periodo){
                params['periodo._id'] = form.periodo._id;
            }
            if (form.servicio){
                params['lote.servicio._id'] = form.servicio._id;
            }
            if (form.categoria){
                params['lote.categoria._id'] = form.categoria._id;
            }
            if (form.tipoGuardia){
                params['lote.tipoGuardia'] = form.tipoGuardia.id;
            }
            // Sorting
            params['sort'] = '-fechaEntrega';
        }
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
