import { Input, Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { Nota } from 'src/app/models/Nota';
import { Agente } from 'src/app/models/Agente';


@Component({
    selector: 'app-agente-notas-form',
    templateUrl: './agente-notas-form.html'
  })

export class AgenteNotasFormComponent implements OnInit, OnChanges {
    @Input() agente: Agente;
    @Input() item: Nota = new Nota();
    @Input() editable: Boolean = true;

    @ViewChild(FormGroupDirective) _form;

    public form: FormGroup;

    constructor(private formBuilder: FormBuilder){}

    ngOnInit() {
        this.initForm();
    }

    ngOnChanges(changes:any){
        if ((changes['item'] && !changes['item'].isFirstChange())||
            (changes['agente'] && !changes['agente'].isFirstChange())){
            this.initForm();
        } 
    }

    initForm(){
        this.form = this.formBuilder.group({
            _id      : [ this.item._id ],
            agente   : [ this.agente ],
            fecha    : [ this.item.fecha? this.item.fecha : new Date()],
            titulo   : [ this.item.titulo ],
            detalle  : [ this.item.detalle ]
        });
    }

    public invalid(){
        if (this.form.invalid) formUtils.markFormAsInvalid(this.form);
        return this.form.invalid;
    }

    public resetForms(){
        formUtils.resetForm(this.form, this._form);
    }
}