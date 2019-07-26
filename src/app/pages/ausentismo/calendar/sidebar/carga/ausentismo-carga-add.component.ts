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
    @Output() onErrors: EventEmitter<any> = new EventEmitter<any>();
    @Output() onWarnings: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(FileManagerComponent) fileManager: FileManagerComponent;
    // @ViewChild(AusentismoCargaFormComponent) fileManager: FileManagerComponent;

    
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
            this.onErrors.emit();
        }
    }

    private saveAusentismo(ausentismo){
        this.ausentismoService.postAusentismo(ausentismo)
            .subscribe(data => {
                console.log('Volviendo de crear las ausencias');
                console.log(data);
                if (data.warnings){
                    this.onWarnings.emit(data.warnings);            
                }
                else{
                    // this.saveFiles(data);
                    this.onSuccess.emit(data);
                }
                
            },
            error=> this.onErrors.emit(error));
    }

    private saveFiles(ausentismo){
        console.log('Corresponde attachar los archivos tambien');
        this.fileManager.attachFilesToObj(this.ausentismoFiles.map(f=>{f.id}))
        .subscribe(files=>{
            console.log('Archivos attachados');
            console.log(files);
        })
    }

    public onFormWarnings(warnings){
        this.onWarnings.emit(warnings);
    }

    public onFormErrors(errors){
        this.onErrors.emit(errors);
    }

    
    // public onChangedArticulo(articulo){
    //     if (articulo) this.sugerirDatosAusentismo();
    // }

    // public onChangedFechaDesde(value){
    //     if (value) this.sugerirDatosAusentismo();
    // }

    // public onChangedCantidadDias(dias){
    //     if (dias){
    //         this.ausentismoForm.patchValue({fechaHasta:null});
    //         this.calcularDatosAusentismo();
    //     } 
    // }

    // public onChangedFechaHasta(value){
    //     if (value){
    //         this.ausentismoForm.patchValue({cantidadDias:null});
    //         this.calcularDatosAusentismo();
    //     } 
    // }

    // calcularDatosAusentismo(){
    //     let ausentismo = new Ausentismo(this.ausentismoForm.value)
    //     let form:any = this.ausentismoForm.value;
    //     if ( form.articulo && form.fechaDesde){
    //         this.ausentismoService.postCalcularAusentismo(ausentismo)
    //         .subscribe(data => {
    //             console.log(data);
    //             this.ausentismoForm.patchValue({cantidadDias:data.dias});
    //             this.ausentismoForm.patchValue({fechaHasta:data.hasta})
    //         },
    //         error=> this.onErrors.emit(error));            
    //     }
    // }

    // sugerirDatosAusentismo(){
    //     let ausentismo = new Ausentismo(this.ausentismoForm.value)
    //     let form:any = this.ausentismoForm.value;
    //     if ( form.articulo && form.fechaDesde){
    //         this.ausentismoService.postSugerirAusentismo(ausentismo)
    //         .subscribe(data => {
    //             console.log(data);
    //             this.ausentismoForm.patchValue({cantidadDias:data.dias});
    //             this.ausentismoForm.patchValue({fechaHasta:data.hasta})
    //             if (data.warnings){
    //                 this.onWarnings.emit(data.warnings);            
    //             }
                
    //         },
    //         error=> this.onErrors.emit(error));            
    //     }
    // }
}