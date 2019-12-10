import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';

import * as enumerados from 'src/app/models/enumerados';
import { GuardiaService } from 'src/app/services/guardia.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { AgrupamientoService } from 'src/app/services/agrupamiento.service';
import { GuardiaPeriodoService } from 'src/app/services/guardia-periodo.service';


@Component({
    selector: 'app-guardia-search-form',
    templateUrl: 'guardia-search-form.html',
})
export class GuardiaSearchFormComponent extends CRUDSearchFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //Search form options
    public tipoGuardiaOpciones = enumerados.getObjTipos(enumerados.TipoGuardia);
    public periodoOpciones$ = this.guardiaPeriodoService.get({});
    // public servicioOpciones$ = this.servicioService.getByUserID({ userID : this.authService.usuario.id });
    public servicioOpciones$ = this.servicioService.getByUserID({});
    public categoriaOpciones$ = this.categoriaService.get({});
    

    constructor(
        formBuilder: FormBuilder,
        private objectService: GuardiaService,
        private servicioService: UbicacionService,
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
                params['periodo.id'] = form.periodo.id;
            }
            if (form.servicio){
                params['servicio.id'] = form.servicio.id;
            }
            if (form.categoria){
                params['categoria.id'] = form.categoria.id;
            }
            if (form.tipoGuardia){
                params['tipoGuardia'] = form.tipoGuardia.id;
            }
            // Sorting
            params['sort'] = '-fechaEntrega';
        }
        return params;
    }

    search(searchParams){
        // if (this.searchForm.valid){
            this.objectService.get(searchParams).subscribe(
                objects => {
                    console.log(objects)
                    this.searchEnd.emit(objects);
                },
                (err) => {
                    this.searchEnd.emit([])
                }
            );
        // }
    }

}
