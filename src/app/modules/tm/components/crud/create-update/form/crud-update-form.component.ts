import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormBuilder } from '@angular/forms';

import { CrudCreateFormComponent } from './crud-create-form.component';

export abstract class CrudUpdateFormComponent extends CrudCreateFormComponent implements OnInit {
    private _objectID:any;
    public object:any; 

    constructor(
        public formBuilder: FormBuilder,
        public route: ActivatedRoute
    ){
        super(formBuilder);    
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this._objectID = params.get('id');
            if (this._objectID){
                this.getDataToUpdate(this._objectID).subscribe(
                    data => {
                        if (data){
                            this.initFormSelectOptions();
                            this.object = data;
                            this.form = this.initForm();
                            window.setTimeout(() => this.patchFormValues(), 1000);
                        } else {
                            this.error.emit('El objecto  que desea editar no existe!');
                        }
                    },
                    error => this.error.emit(error));
                
                // this.objectService.getByID(this._objectID).subscribe(
                //     data => {
                //         if (data){
                //             this.initFormSelectOptions();
                //             this.object = data;
                //             this.form = this.initForm();
                //             window.setTimeout(() => this.patchFormValues(), 1000);
                //         } else {
                //             this.error.emit('El objecto  que desea editar no existe!');
                //         }
                //     },
                //     error => this.error.emit(error));
            }
        });
    }

    
    abstract getDataToUpdate(objID):Observable<any>;

    /**
     * Override this if necessary.
     * Por algun motivo el componente plex-date no renderiza el valor inicial
     * cuando se utiliza con reactive forms. Suponiendo que exista un campo en
     * el formulario de tipo date identificado con el nombre fecha se podria
     * 'corregir' este inconveniente con la siguiente linea de codigo:
     *     - this.form.patchValue({ fecha: this.form.value.fecha });
     * 
     */
    protected patchFormValues(){
        //this.form.patchValue({ fecha: this.form.value.fecha });
    }
    
}