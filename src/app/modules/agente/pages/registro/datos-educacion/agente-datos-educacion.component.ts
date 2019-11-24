import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray  } from '@angular/forms';

import * as enumerados from 'src/app/models/enumerados';
import { Educacion } from 'src/app/models/Educacion';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
    selector: 'agente-datos-educacion',
    templateUrl: './agente-datos-educacion.html',
    // styleUrls: ['./agente-datos-educacion.scss']
})
export class AgenteDatosEducacionComponent implements OnInit {

    @Input() educacion: Educacion[];
    @Input() editable: boolean = false;
    @Output() outputEducacion: EventEmitter<Educacion[]> = new EventEmitter<Educacion[]>();
    
    datosEducacionForm: FormGroup;
    public titulos: Array<Educacion[]> = [];
    tiposEducacion = enumerados.getObjTipos(enumerados.TipoEducacion);
    
    constructor(
        private formBuilder: FormBuilder,
        private educacionService: EducacionService){}
    
    ngOnInit() {
        this.datosEducacionForm = this.createDatosEducacionForm();
        this.educacionForms.valueChanges.subscribe(() => {
            // Solo emitimos cambios de aquellos formularios que 
            // tengan todos sus datos. Este comportamiento si es
            // necesario se puede modificar en el futuro
            let output:Educacion[] = [];
            const educacionValues = this.educacionForms.value;
            educacionValues.forEach(element => {
                if (element.educacion && element.educacion.tipoEducacion != null){
                    output.push(element.educacion)
                }
            });
            this.outputEducacion.emit(output);
        });
    }

    getTitulosOptions(index){
        return this.titulos[index];
    }

    addTitulosOptions(tipoEducacion){
        if (!tipoEducacion){
            this.titulos.push([]);
        }
        else{
            this.educacionService.get({tipoEducacion:tipoEducacion})
                .subscribe(data => {
                    this.titulos.push(data);
            });
        }
    }

    changeTitulosOptions(option, index){
        let tipoEducacion = option.value? option.value.id : null;
        this.resetEducacion(index, tipoEducacion);
        this.educacionService.get({tipoEducacion:tipoEducacion})
            .subscribe(data => {
                this.titulos[index]=data;
        });
    }

    deleteTitulosOptions(index){
        this.titulos.splice(index, 1);
    }

    createDatosEducacionForm(){
        let educacionForms = [];
        if (this.educacion.length > 0){
            this.educacion.forEach(edu => {
                const educacion = this.createEducacionForm(edu);
                educacionForms.push(educacion);
            });
        }
        else{
            const educacion = this.createEducacionForm(new Educacion());
            educacionForms.push(educacion);
        }
        return this.formBuilder.group({
            educacion : this.formBuilder.array(educacionForms)
        });
    }


    get educacionForms() {
        return this.datosEducacionForm.get('educacion') as FormArray;
    }

    createEducacionForm(educacion:Educacion){
        this.addTitulosOptions(educacion.tipoEducacion);
        return this.formBuilder.group({ 
            tipoEducacion      : [educacion.tipoEducacion],
            educacion          : [educacion],
        })
    }

    addEducacion() {
        const educacion = this.createEducacionForm(new Educacion());
        this.educacionForms.push(educacion);
    }

    deleteEducacion(i) {
        this.deleteTitulosOptions(i);
        this.educacionForms.removeAt(i)
    }

    resetEducacion(i, newValue){
        let educacion = new Educacion();
        let formControl = this.formBuilder.group({ 
            tipoEducacion      : [newValue],
            educacion          : [educacion],
        })
        this.educacionForms.setControl(i, formControl);
    }
}