import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { FileManagerComponent } from 'src/app/components/file-manager/file.manager.component';

import { ArticuloService } from 'src/app/services/articulo.service';
import { AusentismoService } from 'src/app/services/ausentismo.service';
import { CalendarStoreService } from 'src/app/stores/calendar.store.service';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { Agente } from 'src/app/models/Agente';
import { Articulo } from 'src/app/models/Articulo';


@Component({
    selector: 'app-ausentismo-carga-add',
    templateUrl: 'ausentismo-carga-add.html'
})
export class AusentismoCargaAddComponent implements OnInit, OnChanges {
    @Input() agente: Agente;
    
    @Output() onSuccess: EventEmitter<Ausentismo> = new EventEmitter<Ausentismo>();
    @Output() onErrors: EventEmitter<any> = new EventEmitter<any>();
    @Output() onWarnings: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FileManagerComponent) fileManager: FileManagerComponent;

    
    public ausentismoForm: FormGroup;
    public articulos: Articulo[] = [];
    
    public formTitle:String = 'Carga';
    public disableGuardar = true;      // Determina cuando habilitar el boton de guardado del form

    constructor(
        private formBuilder: FormBuilder,
        private articuloService: ArticuloService,
        private ausentismoService: AusentismoService,
        private calendarStoreService: CalendarStoreService){}

    public ngOnInit() {
        this.initFormSelectOptions();
        this.patchFormRangeSelection();
        
    }

    /**
     * Actualizamos el formulario ante cualquier cambio del agente 
     * como @Input. Igualmente quitamos cualquier archivo adjunto
     * previamente cargado.
     */
    public ngOnChanges(){
        if (this.ausentismoForm){
            // Si el formulario ya existia, limpiamos cualquier valor previo
            this.ausentismoForm.reset();
            this.fileManager.reset();
        }
        this.initAusentismoForm();
    }

    initFormSelectOptions(){
        this.articuloService.get({})
            .subscribe(data => {
            this.articulos = data;
        });
    }

    initAusentismoForm(){
        const ausentismo = new Ausentismo();
        this.ausentismoForm = this.formBuilder.group({
            agente            : [this.agente],
            id                : [ausentismo.id],
            articulo          : [ausentismo.articulo],
            fechaDesde        : [ausentismo.fechaDesde],
            fechaHasta        : [ausentismo.fechaHasta],
            cantidadDias      : [ausentismo.cantidadDias],
            observacion       : [ausentismo.observacion],
            enableSugerencias : [false],
        });
    }

    patchFormRangeSelection(){
        const rangeSelection = this.calendarStoreService.selectionRange;
        if (rangeSelection){
            this.ausentismoForm.patchValue({ fechaDesde:rangeSelection.fechaDesde});
            this.ausentismoForm.patchValue({ fechaHasta:rangeSelection.fechaHasta});
        }
    }


    private saveAusentismo(ausentismo){
        this.calendarStoreService.addAusentismo(ausentismo)
            .subscribe(data => {
                if (data.warnings){
                    this.onWarnings.emit(data.warnings);            
                }
                else{
                    // Guardamos los archivos adjuntos
                    this.saveFiles(data);
                    this.onSuccess.emit(data);
                }
            },
            error=> this.onErrors.emit(error));
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