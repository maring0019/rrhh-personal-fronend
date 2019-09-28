import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { Feriado } from 'src/app/models/Feriado';
import { FeriadoService } from 'src/app/services/feriado.service';
import { FeriadoCreateComponent } from '../create/feriado-create.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Plex } from '@andes/plex';

import {Location} from '@angular/common';

@Component({
    selector: 'app-feriado-update',
    templateUrl: '../create/feriado-create.html'
  })

export class FeriadoUpdateComponent  implements OnInit, AfterViewInit {
    // @Input() object: Feriado;

    // @ViewChild(FormGroupDirective) _form;

    private _objectID:any;
    public form: FormGroup;
    
    // public tiposNormaLegal: TipoNormaLegal[] = [];
    // public causas: CausaBaja[] = [];

    
    constructor(
        public formBuilder: FormBuilder,
        public objectService: FeriadoService,
        public _location: Location,
        private route: ActivatedRoute,
        private router: Router,
        public plex: Plex
    ){
        // super(formBuilder, objectService, _location)
    }

    ngOnInit() {
        // this.route.paramMap.subscribe((params: ParamMap) => {
        //     this._objectID = params.get('id');
        //     console.log('PARAMS URLS')
        //     console.log(this._objectID)
        //     if (this._objectID){
        //         this.objectService.getByID(this._objectID).subscribe((data) => {
        //             if (data){
        //                 this.initFormSelectOptions();
        //                 this.object = new Feriado(data);
        //                 this.form = this.initForm();
        //                 // this.initForm();
        //             }else{
        //                 this.plex.info('info', 'El objecto  que desea editar no existe!')
        //                     .then( e => {
        //                         // this.volverInicio();
        //                 });
        //             }
        //         });
        //     }
        // });
    }

    ngAfterViewInit(){
        window.setTimeout(() => {
            if (this.form) this.form.patchValue({ fecha: this.form.value.fecha });
        }, 1000);
        
    }

    public guardar(){
        // const feriado = new Feriado(this.form.value);
        // this.objectService.put(feriado)
        //     .subscribe(
        //         data=> {
        //             this.success.emit(data);
        //             formUtils.resetForm(this.form, this._form);
        //         },
        //         error => this.error.emit(error)
        //     )
    }

    // public aceptar(){
    //     if (this.invalid()) return;
    //     this.guardar();
    // }   
}



