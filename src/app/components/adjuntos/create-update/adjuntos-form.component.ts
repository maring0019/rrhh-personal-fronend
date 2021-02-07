import { Input, Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import  *  as formUtils from 'src/app/utils/formUtils';

import { Adjunto } from 'src/app/models/Adjunto';


@Component({
    selector: 'app-adjuntos-form',
    templateUrl: './adjuntos-form.html'
  })

export class AdjuntosFormComponent implements OnInit, OnChanges {
    @Input() object: any;
    @Input() item: Adjunto = new Adjunto();
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
            object   : [ this.object ],
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