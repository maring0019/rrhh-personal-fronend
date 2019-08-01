import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import  *  as formUtils from 'src/app/utils/formUtils';
import { AusentismoService } from 'src/app/services/ausentismo.service';
import { ArticuloService } from 'src/app/services/articulo.service';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { Articulo } from 'src/app/models/Articulo';

import { FileManagerComponent } from 'src/app/pages/ausentismo/calendar/sidebar/carga/file.manager.component';


@Component({
    selector: 'app-ausentismo-carga-update',
    templateUrl: 'ausentismo-carga-update.html'
})
export class AusentismoCargaUpdateComponent implements OnInit {
    @Input() ausentismo: Ausentismo;
    @Input() ausentismoFiles: any;

    @Output() onSuccess: EventEmitter<Ausentismo> = new EventEmitter<Ausentismo>();
    @Output() onErrors: EventEmitter<any> = new EventEmitter<any>();
    @Output() onWarnings: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FileManagerComponent) fileManager: FileManagerComponent;

    public ausentismoForm: FormGroup;
    public articulos: Articulo[] = [];
    
    public formTitle:String = 'Edición';
    public disableGuardar = true;

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
            enableSugerencias : [false],
        });
    }

    saveAusentismo(ausentismo:Ausentismo){
        this.ausentismoService.putAusentismo(ausentismo)
            .subscribe(data => {
                if (data.warnings && data.warnings.length){
                    console.log('Hay Warnings')
                    this.onWarnings.emit(data.warnings);            
                }
                else{
                    // Guardamos los archivos adjuntos
                    console.log('NO Hay Warnings')
                    console.log(data)
                    this.saveFiles(data);
                    this.onSuccess.emit(data);
                }
            },
            error => this.onErrors.emit(error));
    }

    private saveFiles(ausentismo){
        this.fileManager.saveFileChanges(ausentismo);
    }

    public onSave(){
        if (this.ausentismoForm.valid){
            this.saveAusentismo(new Ausentismo(this.ausentismoForm.value));
        }
        else{
            formUtils.markFormAsInvalid(this.ausentismoForm);
            this.onErrors.emit();
        }
    }

    public onFormWarnings(warnings){
        this.onWarnings.emit(warnings);
    }

    public onFormErrors(errors){
        this.onErrors.emit(errors);
    }

    public onFilesChanged(e){
        this.disableGuardar = false;
    }

    public onValueChangedForm(obj){
        this.disableGuardar = false;
    }
}