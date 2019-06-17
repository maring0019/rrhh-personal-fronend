import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Plex } from '@andes/plex';

import { ArticuloService } from 'src/app/services/articulo.service';
import { Articulo } from 'src/app/models/Articulo';
import { AusenciaPeriodo } from 'src/app/models/AusenciaPeriodo';
import { AusentismoService } from 'src/app/services/ausentismo.service';
import { IAusenciaEvento } from 'src/app/models/IAusenciaEvento';

@Component({
    selector: 'app-ausentismo-carga',
    templateUrl: 'ausentismo-carga.html'
})
export class AusentismoCargaComponent implements OnInit {
    @Input() periodo: AusenciaPeriodo;
    @Output() outputAusencias: EventEmitter<IAusenciaEvento[]> = new EventEmitter<IAusenciaEvento[]>();
    
    ausencia:any;
    articulos: Articulo[] = [];

    ausenciaForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private articuloService: ArticuloService,
        private ausentismoService: AusentismoService,
        public plex: Plex){}

    public ngOnInit() {
        this.articuloService.get({}) // Init Articulos (select)
            .subscribe(data => {
                this.articulos = data;
        });
        this.ausenciaForm = this.createAusenciaForm();
    }

    createAusenciaForm()
    {
        return this.formBuilder.group({
            agente            : [this.periodo.agente],
            articulo          : [this.periodo.articulo],
            fechaDesde        : [this.periodo.fechaDesde],
            fechaHasta        : [this.periodo.fechaHasta],
            cantidadDias      : [this.periodo.cantidadDias],
            observacion       : [this.periodo.observacion],
        });
    }

    markFormAsInvalid(form){
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            control.markAsTouched({ onlySelf: true });
            });
    }

    resetForm(){
        this.periodo = new AusenciaPeriodo();
        this.ausenciaForm = this.createAusenciaForm();
    }

    onClose(){

    }

    onSave(){
        if (this.ausenciaForm.valid){
            const ausenciaPeriodo = new AusenciaPeriodo(this.ausenciaForm.value);
            this.ausentismoService.postAusenciasPeriodo(ausenciaPeriodo)
                .subscribe(data => {
                    this.outputAusencias.emit(data);
                    this.resetForm();
                    this.plex.info('success', 'Se ingresaron correctamente las ausencias');
                });
        }
        else{
            this.markFormAsInvalid(this.ausenciaForm);
            this.plex.info('info', 'Debe completar todos los datos obligatorios');
        }
    }

}