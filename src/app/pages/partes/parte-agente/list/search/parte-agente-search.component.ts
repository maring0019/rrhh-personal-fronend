import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';

import { ParteService } from 'src/app/services/parte.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';

import { UbicacionServicio } from 'src/app/models/UbicacionServicio';


@Component({
    selector: 'app-parte-agente-search-form',
    templateUrl: 'parte-agente-search.html',
})
export class ParteAgenteSearchFormComponent extends CRUDSearchFormComponent implements OnInit, AfterViewInit, OnDestroy {

    //Search form options
    public servicioOpciones:UbicacionServicio[] = []; 

    constructor(
        formBuilder: FormBuilder,
        private objectService: ParteService,
        private ubicacionService: UbicacionService) {
            super(formBuilder);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngAfterViewInit(){
        this.searchForm.patchValue({ 
            fecha: this.searchForm.value.fecha,
            servicio: this.getServiciosUserLogged()[1]
             })
    }

    ngOnDestroy(){
        super.ngOnDestroy();
    }

    initFormSelectOptions(){
        this.ubicacionService.get({})
            .subscribe(data => {
                this.servicioOpciones = data;
        });
    }

    initSearchForm(){
        return this.formBuilder.group({
            fecha     : [ new Date()],
            servicio  : []
        });
    }

    private getServiciosUserLogged(){
        return this.servicioOpciones;
    }

    prepareSearchParams(){
        let params:any = {};
        let form = this.searchForm.value;
        if (form.fecha){
            params['fecha'] = form.fecha;
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
                // TODO: Recuperar los partes de los agentes
                this.searchEnd.emit(objects);
            },
            (err) => {
                this.searchEnd.emit([])
            }
        );
    }

}
