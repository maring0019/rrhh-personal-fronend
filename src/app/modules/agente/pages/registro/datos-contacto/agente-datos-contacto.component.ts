import { Component, OnInit, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray  } from '@angular/forms';
import * as enumerados from 'src/app/models/enumerados';
import { Agente } from 'src/app/models/Agente';
import { IContacto } from 'src/app/models/IContacto';

@Component({
    selector: 'agente-datos-contacto',
    templateUrl: './agente-datos-contacto.html',
    // styleUrls: ['./agente-datos-contacto.scss']
})
export class AgenteDatosContactoComponent implements OnInit {

    @Input() contactos: IContacto[];
    
    datosContactoForm: FormGroup;
    tiposContacto = enumerados.getObjTipoComunicacion();
    
    constructor(private formBuilder: FormBuilder){}
    
    ngOnInit() {
        this.datosContactoForm = this.createDatosContactoForm();
    }

    createDatosContactoForm()
    {
        let contactForms = [];
        if (this.contactos.length>0){
            this.contactos.forEach(e => {
                const contacto = this.createContacto(e.tipo, e.valor);
                contactForms.push(contacto);
            });
        }
        else{
            const contacto = this.createContacto('telefonoCelular', '');
            contactForms.push(contacto);
        }
        return this.formBuilder.group({
            contactos : this.formBuilder.array(contactForms)
        });
    }


    get contactoForms() {
        return this.datosContactoForm.get('contactos') as FormArray;
    }

    createContacto(tipoContacto, valor){
        return this.formBuilder.group({ 
            tipo               : [tipoContacto],
            valor              : [valor],
        })
    }
      
    addContacto() {
        const contacto = this.createContacto('telefonoCelular', '');
        this.contactoForms.push(contacto);
    }
    
    deleteContacto(i) {
        this.contactoForms.removeAt(i)
    }
}