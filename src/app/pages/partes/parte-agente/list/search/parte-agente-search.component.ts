import { Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';

import { ParteService } from 'src/app/services/parte.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';

import { UbicacionServicio } from 'src/app/models/UbicacionServicio';
import { Parte } from '../../../../../models/Parte';


@Component({
    selector: 'app-parte-agente-search-form',
    templateUrl: 'parte-agente-search.html',
})
export class ParteAgenteSearchFormComponent extends CRUDSearchFormComponent implements OnInit, AfterViewInit, OnDestroy {

    @Output() searchEndParte: EventEmitter<Parte> = new EventEmitter<Parte>();
    
    //Search form options
    public servicioOpciones:UbicacionServicio[] = []; 

    constructor(
        formBuilder: FormBuilder,
        private objectService: ParteService,
        private ubicacionService: UbicacionService) {
            super(formBuilder);
    }

    ngOnInit() {
        // Aqui hacemos un override completo del evento ngOnInit
        this.initFormSelectOptions();
    }

    ngAfterViewInit(){
        // Parche para visualizar correctamente la fecha en el reactive form
        window.setTimeout(() => {
            if (this.searchForm){
                this.searchForm.patchValue({ 
                    fecha: this.searchForm.value.fecha,
                 })
            }
        }, 1000);
    }

    ngOnDestroy(){
        super.ngOnDestroy();
    }

    initFormSelectOptions(){
        this.getServiciosUserLogged()
            .subscribe(data => {
                this.servicioOpciones = data;
                this.searchForm = this.initSearchForm();
                this.buscar();
        });
    }

    initSearchForm(){
        return this.formBuilder.group({
            fecha     : [ new Date()],
            servicio  : [ this.servicioOpciones[1]]
        });
    }

    private getServiciosUserLogged(){
        return this.ubicacionService.getByUserID({});
    }

    prepareSearchParams(){
        let params:any = {};
        if (this.searchForm.valid){
            let form = this.searchForm.value;
            if (form.fecha){
                params['fecha'] = form.fecha;
            }
            if (form.servicio){ // Filtro por servicio del parte
                params['ubicacion.id'] = form.servicio.id;
            }
        }
        return params;
    }

    search(searchParams){
        this.objectService.get(searchParams).subscribe(
            objects => {
                if (objects && objects.length){
                    // Si el parte existe buscamos los partes de los agentes
                    // asociados al parte encontrado y notificamos
                    const parte = objects[0];
                    this.searchEndParte.emit(parte);
                    this.searchPartesAgentes(parte.id);
                }
                else {
                    // Si el parte no existe lo creamos junto a los
                    // partes de los agentes.
                    this.createPartes();
                }
            },
            (err) => {
                this.searchEnd.emit([])
            }
        );
    }

    searchPartesAgentes(parteID){
        this.objectService.getPartesAgentes(parteID).subscribe(
            objects => {
                this.searchEnd.emit(objects);
            },
            (err) => {
                this.searchEnd.emit([])
            }
        );
    }

    createPartes(){
        if (this.searchForm.valid){
            const form = this.searchForm.value;
            let parte = new Parte({ fecha: form.fecha, ubicacion: form.servicio });
            this.objectService.post(parte).subscribe(
                object => {
                    if (object) {
                        this.searchEndParte.emit(object);
                        return this.searchPartesAgentes(object.id)
                    }
                    else{
                        this.searchEndParte.emit(null);
                        this.searchEnd.emit([]);
                    }
                },
                (err) => {
                    this.searchEnd.emit([])
                }
            );
        }
    }

}
