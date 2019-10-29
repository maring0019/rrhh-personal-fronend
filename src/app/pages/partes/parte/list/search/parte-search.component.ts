import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';

import { ParteService } from 'src/app/services/parte.service';
import { ParteEstadoService } from 'src/app/services/parte-estado.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';

import { ParteEstado } from 'src/app/models/ParteEstado';
import { UbicacionServicio } from 'src/app/models/UbicacionServicio';


@Component({
    selector: 'app-parte-search-form',
    templateUrl: 'parte-search.html',
})
export class ParteSearchFormComponent extends CRUDSearchFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //Search form options
    public parteEstadoOpciones:ParteEstado[] = [];
    public procesadoOpciones; 
    public servicioOpciones:UbicacionServicio[] = []; 

    constructor(
        formBuilder: FormBuilder,
        private objectService: ParteService,
        private parteEstadoService: ParteEstadoService,
        private ubicacionService: UbicacionService) {
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
        this.procesadoOpciones = [{id:'si', nombre:'Si'}, {id:'no', nombre:'No'}];
        this.parteEstadoService.get({})
            .subscribe(data => {
                this.parteEstadoOpciones = data;
        });
        this.ubicacionService.get({})
            .subscribe(data => {
                this.servicioOpciones = data;
        });
    }

    initSearchForm(){
        return this.formBuilder.group({
            fechaDesde  : [],
            fechaHasta  : [],
            estado      : [],
            procesado   : [],
            servicio    : []
        });
    }

    prepareSearchParams(){
        let params:any = {};
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
        if (form.servicio){ // Filtro por servicio del parte
            params['ubicacion.id'] = form.servicio.id;
        }
        // Sorting
        // params['sort'] = 'nombre';   
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