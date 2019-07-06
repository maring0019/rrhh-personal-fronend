import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Plex } from '@andes/plex';
import  *  as formUtils from 'src/app/utils/formUtils';

import { ArticuloService } from 'src/app/services/articulo.service';
import { AusentismoService } from 'src/app/services/ausentismo.service';

import { Articulo } from 'src/app/models/Articulo';
import { Ausentismo } from 'src/app/models/Ausentismo';
import { IAusenciaEvento } from 'src/app/models/IAusenciaEvento';
import { Agente } from 'src/app/models/Agente';

import { DateRangeSelection } from '../../agente-calendar.component';



@Component({
    selector: 'app-ausentismo-carga',
    templateUrl: 'ausentismo-carga.html'
})
export class AusentismoCargaComponent implements OnInit {
    @Input() agente: Agente;
    @Input() ausentismo: Ausentismo = new Ausentismo();
    @Output() outputAusencias: EventEmitter<IAusenciaEvento[]> = new EventEmitter<IAusenciaEvento[]>();
    @Output() changedDateRange: EventEmitter<DateRangeSelection> = new EventEmitter<DateRangeSelection>();
    @Output() canceled:EventEmitter<any> = new EventEmitter<any>();


    public articulos: Articulo[] = [];
    public ausentismoForm: FormGroup;
    public formTitle:String = '';

    constructor(
        protected formBuilder: FormBuilder,
        protected articuloService: ArticuloService,
        protected ausentismoService: AusentismoService,
        protected plex: Plex){}

    public ngOnInit() {
        this.initFormSelectOptions();
        this.initAusentismoForm(this.ausentismo);
    }

    initFormSelectOptions(){
        this.articuloService.get({})
            .subscribe(data => {
            this.articulos = data;
        });
    }

    initAusentismoForm(ausentismo){
        this.ausentismoForm = this.formBuilder.group({
            agente            : [this.agente],
            id                : [ausentismo.id],
            articulo          : [ausentismo.articulo],
            fechaDesde        : [ausentismo.fechaDesde],
            fechaHasta        : [ausentismo.fechaHasta],
            cantidadDias      : [ausentismo.cantidadDias],
            observacion       : [ausentismo.observacion],
            adjuntos          : [[]]
        });
    }

    public onFilesUploadedChanged(files){
        let fileIds = files.map( adj => adj = adj.real_id);
        this.ausentismoForm.get('adjuntos').setValue(fileIds);
    }

    public onSave(){
        if (this.ausentismoForm.valid){
            this.saveAusentismo(new Ausentismo(this.ausentismoForm.value));
        }
        else{
            formUtils.markFormAsInvalid(this.ausentismoForm);
            this.plex.info('info', 'Debe completar todos los datos obligatorios');
        }
    }

    protected saveAusentismo(ausentismo){}

    public onClose(){
        this.canceled.emit();
    }

    public onChangedDate(value){
        let fd:Date = this.ausentismoForm.value.fechaDesde;
        let fh:Date = this.ausentismoForm.value.fechaHasta;
        if ((fd && fh) && (fd>fh)) return; // Form validation
        if (!fd && !fh){
            this.changedDateRange.emit();
            return;
        }
        if (fd && fh) {
            this.changedDateRange.emit({fechaDesde:fd, fechaHasta:this.getTomorrow(fh)});
            return;
        }
        if (fd && !fh) {
            this.changedDateRange.emit({fechaDesde:fd, fechaHasta:this.getTomorrow(fd)});
            return;
        }
        if (!fd && fh) {
            this.changedDateRange.emit({fechaDesde:fh, fechaHasta:this.getTomorrow(fh)});
            return;
        }
    }

    public getTomorrow(date){
        let tomorrow = new Date(date);
        tomorrow.setDate(date.getDate() + 1);
        return tomorrow;
    }
}