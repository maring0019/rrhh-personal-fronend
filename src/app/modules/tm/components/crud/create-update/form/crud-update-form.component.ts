import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { CrudCreateFormComponent } from './crud-create-form.component';

@Component({
    selector: 'app-crud-update-form',
    templateUrl: './crud-form.html'
  })

export abstract class CrudUpdateFormComponent extends CrudCreateFormComponent implements OnInit {
    private _objectID:any;
    public object:any; 

    constructor(
        public formBuilder: FormBuilder,
        public objectService: any,
        public route: ActivatedRoute
    ){
        super(formBuilder, objectService);    
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this._objectID = params.get('id');
            if (this._objectID){
                this.objectService.getByID(this._objectID).subscribe(
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
            }
        });
    }

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
    
    /**
     * Override this if necessary
     */
    protected guardar(){
        const feriado = this.form.value;
        this.objectService.put(feriado)
            .subscribe(
                data=> {
                    this.success.emit(data);
                    formUtils.resetForm(this.form, this._form);
                },
                error => this.error.emit(error)
            )
    }
  
}