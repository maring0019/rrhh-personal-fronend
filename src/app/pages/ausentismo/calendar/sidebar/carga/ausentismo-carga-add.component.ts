import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import  *  as formUtils from 'src/app/utils/formUtils';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Plex } from '@andes/plex';

import { AgenteService } from 'src/app/services/agente.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { AusentismoService } from 'src/app/services/ausentismo.service';
import { FilesService } from 'src/app/services/files.service';

import { Ausentismo } from 'src/app/models/Ausentismo';
import { Agente } from 'src/app/models/Agente';
import { Articulo } from 'src/app/models/Articulo';
import { FileManagerComponent } from 'src/app/pages/ausentismo/calendar/sidebar/carga/file.manager.component';

@Component({
    selector: 'app-ausentismo-carga-add',
    templateUrl: 'ausentismo-carga-add.html'
})
export class AusentismoCargaAddComponent implements OnInit {
    @Input() agente: Agente;
    
    @Output() onSuccess: EventEmitter<Ausentismo> = new EventEmitter<Ausentismo>();
    @Output() onError: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FileManagerComponent) fileManager: FileManagerComponent;
    
    public ausentismoFiles: any = [];
    public ausentismoForm: FormGroup;
    public articulos: Articulo[] = [];
    
    public formTitle:String = 'Carga';

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
        const ausentismo = new Ausentismo();
        this.ausentismoForm = this.formBuilder.group({
            agente            : [this.agente],
            id                : [ausentismo.id],
            articulo          : [ausentismo.articulo],
            fechaDesde        : [ausentismo.fechaDesde],
            fechaHasta        : [ausentismo.fechaHasta],
            cantidadDias      : [ausentismo.cantidadDias],
            observacion       : [ausentismo.observacion],
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

    private saveAusentismo(ausentismo){
        this.ausentismoService.postAusentismo(ausentismo)
            .subscribe(data => {
                this.saveFiles(data);
                this.onSuccess.emit(data);
            },
            error=> this.onError.emit(error));
    }

    private saveFiles(ausentismo){
        console.log('Corresponde attachar los archivos tambien');
        this.fileManager.attachFilesToObj(this.ausentismoFiles.map(f=>{f.id}))
        .subscribe(files=>{
            console.log('Archivos attachados');
            console.log(files);
        })
    }
}