import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { TipoNormaLegalService } from 'src/app/services/tipo-norma-legal.service';
import { NormaLegal } from 'src/app/models/NormaLegal';
import { FileManagerComponent } from 'src/app/components/file-manager/file.manager.component';


@Component({
    selector: 'agente-datos-norma-legal',
    templateUrl: './agente-datos-norma-legal.html'
})
export class AgenteDatosNormaLegalComponent implements OnInit, OnChanges {
    @Input() normaLegal: NormaLegal;
    @Input() editable: boolean = false;
    @Output() change: EventEmitter<NormaLegal> = new EventEmitter<NormaLegal>();

    @ViewChild(FormGroupDirective) _form;
    @ViewChild(FileManagerComponent) fileManager: FileManagerComponent;

    datosNormaLegalForm: FormGroup;
    public tiposNormaLegal$ = this.tipoNormaLegalService.get({});

    constructor(
        private formBuilder: FormBuilder,
        private tipoNormaLegalService: TipoNormaLegalService)
    {}
    
    ngOnInit() {    
        this.createDatosNormaLegalForm();
        this.datosNormaLegalForm.valueChanges.subscribe(() => {
            this.change.emit(this.datosNormaLegalForm.value);
        });
    }

    ngOnChanges(changes:any){
        if (changes['normaLegal'] && !changes['normaLegal'].isFirstChange()){
            this.createDatosNormaLegalForm();
        } 
    }

    createDatosNormaLegalForm(){
        this.datosNormaLegalForm = this.formBuilder.group({
                _id                 : [this.normaLegal._id],
                tipoNormaLegal      : [this.normaLegal.tipoNormaLegal],
                numeroNormaLegal    : [this.normaLegal.numeroNormaLegal],
                fechaNormaLegal     : [this.normaLegal.fechaNormaLegal],
                observaciones       : [this.normaLegal.observaciones]
            });
    }

    resetForm(){
        formUtils.resetForm(this.datosNormaLegalForm, this._form);
    }

}
