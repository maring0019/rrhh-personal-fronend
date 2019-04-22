import { Component, OnInit, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray  } from '@angular/forms';
import * as enumerados from 'src/app/models/enumerados';
import { Contacto } from 'src/app/models/Contacto';

@Component({
    selector: 'agente-datos-contacto',
    templateUrl: './agente-datos-contacto.html',
    // styleUrls: ['./agente-datos-contacto.scss']
})
export class AgenteDatosContactoComponent implements OnInit {

    @Input() contactos: Contacto[];
    @Output() outputContactos: EventEmitter<Contacto[]> = new EventEmitter<Contacto[]>();
    
    datosContactoForm: FormGroup;
    tiposContacto = enumerados.getObjTipoComunicacion();
    
    constructor(private formBuilder: FormBuilder){}
    
    ngOnInit() {
        this.datosContactoForm = this.createDatosContactoForm();
        this.contactoForms.valueChanges.subscribe(() => {
            this.outputContactos.emit(this.contactoForms.value);
        });
    }

    createDatosContactoForm()
    {
        let contactoForms = [];
        if (this.contactos.length > 0){
            this.contactos.forEach(e => {
                const contacto = this.createContactoForm(e.tipo, e.valor);
                contactoForms.push(contacto);
            });
        }
        else{
            const contacto = this.createContactoForm('celular', '');
            contactoForms.push(contacto);
        }
        return this.formBuilder.group({
            contactos : this.formBuilder.array(contactoForms)
        });
    }


    get contactoForms() {
        return this.datosContactoForm.get('contactos') as FormArray;
    }

    createContactoForm(tipoContacto, valor){
        return this.formBuilder.group({ 
            tipo               : [tipoContacto],
            valor              : [valor],
        })
    }
      
    addContacto() {
        const contacto = this.createContactoForm('celular', '');
        this.contactoForms.push(contacto);
    }
    
    deleteContacto(i) {
        this.contactoForms.removeAt(i)
    }
}