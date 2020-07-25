import { Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import { CRUDSearchFormComponent } from 'src/app/modules/tm/components/crud/list/search/crud-search.component';

import { ParteService } from 'src/app/services/parte.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { AgenteService } from 'src/app/services/agente.service';
import { ParteAgenteService } from 'src/app/services/parte-agente.service';

import { Parte } from 'src/app/models/Parte';
import { ParteAgente } from '../../../../../models/ParteAgente';
import { Auth } from 'src/app/services/auth.service';

@Component({
    selector: 'app-parte-agente-search-form',
    templateUrl: 'parte-agente-search.html',
})
export class ParteAgenteSearchFormComponent extends CRUDSearchFormComponent implements OnInit, AfterViewInit, OnDestroy {

    @Output() searchEndParte: EventEmitter<Parte> = new EventEmitter<Parte>();
    
    public parte:Parte;
    public partesAgentes:ParteAgente[] = [];
    //Search form options
    public servicioOpciones = this.authService.servicios; 

    constructor(
        formBuilder: FormBuilder,
        private objectService: ParteService,
        private authService: Auth,
        private agenteService: AgenteService,
        private parteAgenteService: ParteAgenteService) {
            super(formBuilder);
    }

    ngOnInit() {
        // Aqui hacemos un override completo del evento ngOnInit de la superclase
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
        this.searchForm = this.initSearchForm();
        this.buscar();
    }

    initSearchForm(){
        return this.formBuilder.group({
            fecha     : [ new Date()],
            servicio  : [ this.servicioOpciones[0]]
        });
    }


    prepareSearchParams(){
        let params:any = {};
        if (this.searchForm.valid){
            let form = this.searchForm.value;
            if (form.fecha){
                params['fecha'] = form.fecha;
            }
            if (form.servicio){ // Filtro por servicio del parte
                params['ubicacion.codigo'] = form.servicio.ubicacion;
            }
        }
        return params;
    }

    search(searchParams){
        if (!this.searchForm.valid) {
            this.searchEnd.emit([]);
            return;
        } 
        this.objectService.get(searchParams).subscribe(
            objects => {
                if (objects && objects.length){
                    // Si el parte existe buscamos los partes de los agentes
                    // asociados al parte encontrado y notificamos
                    this.parte = objects[0];
                    this.searchEndParte.emit(this.parte);
                    this.searchPartesAgentes(this.parte._id);
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

    /**
     * Simula un 'refresh' del listado de agentes del parte. Es de utilidad 
     * en casos en los que ya se ha generado previamente el listado, y luego
     * un agente o mas se hayan dado de alta o incorparado como agentes del 
     * servicio del parte y por lo tanto no figuren en el listado original. 
     */
    public reloadPartesAgentes(){
        if (!this.searchForm.valid) return ;
        let form = this.searchForm.value;
        this.agenteService.search({
            'situacionLaboral.cargo.servicio.ubicacion': form.servicio.ubicacion,
            'activo': true
        }).subscribe(agentes => {
            if (agentes.length){
                let agentesAusentes = agentes.filter( x => !this.partesAgentes.filter( y => y.agente._id === x._id).length);
                let partesAgentes:ParteAgente[] = []
                for (const agente of agentesAusentes) {
                    const parteAgente = new ParteAgente({
                        parte: { _id: this.parte._id },
                        agente: { _id: agente._id, nombre: agente.nombre, apellido: agente.apellido },
                        fecha: this.parte.fecha
                    });
                    partesAgentes.push(parteAgente);
                }
                this.parteAgenteService.postMany(partesAgentes).subscribe();
                this.buscar();
            }
        })
    }

    searchPartesAgentes(parteID){
        this.objectService.getPartesAgentes(parteID).subscribe(
            objects => {
                this.partesAgentes = objects;
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
            const ubicacion = { codigo: form.servicio.ubicacion, nombre: form.servicio.nombre }
            let parte = new Parte({ fecha: form.fecha, ubicacion: ubicacion });
            this.objectService.post(parte).subscribe(
                object => {
                    if (object) {
                        this.searchEndParte.emit(object);
                        return this.searchPartesAgentes(object._id)
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
