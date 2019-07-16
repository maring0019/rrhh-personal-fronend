import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import  *  as formUtils from 'src/app/utils/formUtils';
import { AusentismoService } from 'src/app/services/ausentismo.service';
import { ArticuloService } from 'src/app/services/articulo.service';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { Articulo } from 'src/app/models/Articulo';


@Component({
    selector: 'app-ausentismo-carga-update',
    templateUrl: 'ausentismo-carga-update.html'
})
export class AusentismoCargaUpdateComponent implements OnInit {
    @Input() ausentismo: Ausentismo;
    @Input() ausentismoFiles: any;

    @Output() onSuccess: EventEmitter<Ausentismo> = new EventEmitter<Ausentismo>();
    @Output() onError: EventEmitter<any> = new EventEmitter<any>();

    public ausentismoForm: FormGroup;
    public articulos: Articulo[] = [];
    
    public formTitle:String = 'Edición';

    constructor(
        private formBuilder: FormBuilder,
        private articuloService: ArticuloService,
        private ausentismoService: AusentismoService){}

    public ngOnInit() {
        this.initFormSelectOptions();
        this.initAusentismoForm();
    }

    initFormSelectOptions(){
        this.articuloService.get({})
            .subscribe(data => {
            this.articulos = data;
        });
    }

    initAusentismoForm(){
        this.ausentismoForm = this.formBuilder.group({
            agente            : [this.ausentismo.agente],
            id                : [this.ausentismo.id],
            articulo          : [this.ausentismo.articulo],
            fechaDesde        : [this.ausentismo.fechaDesde],
            fechaHasta        : [this.ausentismo.fechaHasta],
            cantidadDias      : [this.ausentismo.cantidadDias],
            observacion       : [this.ausentismo.observacion],
        });
    }

    public onSave(){
        if (this.ausentismoForm.valid){
            this.saveAusentismo(new Ausentismo(this.ausentismoForm.value));
        }
        else{
            formUtils.markFormAsInvalid(this.ausentismoForm);
            this.onError.emit();
        }
    }

    saveAusentismo(ausentismo:Ausentismo){
        this.ausentismoService.putAusentismo(ausentismo)
            .subscribe(data => {
                this.onSuccess.emit(data);
            },
            error => this.onError.emit(error));
    }
}