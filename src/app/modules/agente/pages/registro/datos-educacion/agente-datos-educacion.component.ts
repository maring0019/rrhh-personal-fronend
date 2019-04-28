import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray  } from '@angular/forms';
import * as enumerados from 'src/app/models/enumerados';
import { Educacion } from 'src/app/models/Educacion';

@Component({
    selector: 'agente-datos-educacion',
    templateUrl: './agente-datos-educacion.html',
    // styleUrls: ['./agente-datos-educacion.scss']
})
export class AgenteDatosEducacionComponent implements OnInit {

    @Input() educacion: Educacion[];
    @Output() outputEducacion: EventEmitter<Educacion[]> = new EventEmitter<Educacion[]>();
    
    datosEducacionForm: FormGroup;
    tiposEducacion = enumerados.getObjTipos(enumerados.TipoEducacion);
    
    constructor(private formBuilder: FormBuilder){}
    
    ngOnInit() {
        this.datosEducacionForm = this.createDatosEducacionForm();
        this.educacionForms.valueChanges.subscribe(() => {
            this.outputEducacion.emit(this.educacionForms.value);
        });
    }

    createDatosEducacionForm(){
        let educacionForms = [];
        if (this.educacion.length > 0){
            this.educacion.forEach(e => {
                const educacion = this.createEducacionForm(e.tipoEducacion, e.titulo);
                educacionForms.push(educacion);
            });
        }
        else{
            const educacion = this.createEducacionForm('', '');
            educacionForms.push(educacion);
        }
        return this.formBuilder.group({
            educacion : this.formBuilder.array(educacionForms)
        });
    }


    get educacionForms() {
        return this.datosEducacionForm.get('educacion') as FormArray;
    }

    createEducacionForm(tipoEducacion, titulo){
        return this.formBuilder.group({ 
            tipoEducacion       : [tipoEducacion],
            titulo             : [titulo],
        })
    }

    addEducacion() {
        const educacion = this.createEducacionForm('', '');
        this.educacionForms.push(educacion);
    }

    deleteEducacion(i) {
        this.educacionForms.removeAt(i)
    }
}