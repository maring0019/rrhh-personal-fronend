import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Plex } from '@andes/plex';

import { ArticuloService } from 'src/app/services/articulo.service';
import { AusentismoService } from 'src/app/services/ausentismo.service';

import { Articulo } from 'src/app/models/Articulo';
import { Ausentismo } from 'src/app/models/Ausentismo';
import { IAusenciaEvento } from 'src/app/models/IAusenciaEvento';
import { Agente } from 'src/app/models/Agente';


@Component({
    selector: 'app-ausentismo-carga',
    templateUrl: 'ausentismo-carga.html'
})
export class AusentismoCargaComponent implements OnInit {
    @Input() ausentismo: Ausentismo;
    @Input() agente: Agente;
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
        if (!this.ausentismo) this.ausentismo = new Ausentismo();
        this.articuloService.get({}) // Init Articulos (select)
            .subscribe(data => {
                this.articulos = data;
        });
        this.ausenciaForm = this.createAusenciaForm();
    }

    createAusenciaForm(){
        return this.formBuilder.group({
            agente            : [this.agente],
            articulo          : [this.ausentismo.articulo],
            fechaDesde        : [this.ausentismo.fechaDesde],
            fechaHasta        : [this.ausentismo.fechaHasta],
            cantidadDias      : [this.ausentismo.cantidadDias],
            observacion       : [this.ausentismo.observacion],
            adjuntos          : [[]]
        });
    }

    resetAusenciaForm(){
        this.ausentismo = new Ausentismo();
        this.ausenciaForm = this.createAusenciaForm();
    }

    markFormAsInvalid(form){
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            control.markAsTouched({ onlySelf: true });
            });
    }

    public onSave(){
        if (this.ausenciaForm.valid){
            const ausenciaPeriodo = new Ausentismo(this.ausenciaForm.value);
            this.ausentismoService.postAusentismo(ausenciaPeriodo)
                .subscribe(data => {
                    this.outputAusencias.emit(data.ausencias);
                    this.resetAusenciaForm();
                    this.plex.info('success', 'Se ingresaron correctamente las ausencias');
                });
        }
        else{
            this.markFormAsInvalid(this.ausenciaForm);
            this.plex.info('info', 'Debe completar todos los datos obligatorios');
        }
    }

    onFilesUploadedChanged(files){
        let fileIds = files.map( adj => adj = adj.real_id);
        this.ausenciaForm.get('adjuntos').setValue(fileIds);
    }

    public onClose(){
        
    }
}