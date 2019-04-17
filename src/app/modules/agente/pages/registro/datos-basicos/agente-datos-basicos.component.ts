import { Component, OnInit, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Agente } from 'src/app/models/Agente';
import * as enumerados from 'src/app/models/enumerados';

@Component({
    selector: 'agente-datos-basicos',
    templateUrl: './agente-datos-basicos.html',
    // styleUrls: ['./agente-datos-basicos.scss']
})
export class AgenteDatosBasicosComponent implements OnInit {

    @Input() agente: Agente;
    datosBasicosForm: FormGroup;
    // Form select options
    sexos = enumerados.getObjSexos();
    estados = enumerados.getObjEstadoCivil();

    constructor(private formBuilder: FormBuilder){}
    
    ngOnInit() {
        this.datosBasicosForm = this.createDatosBasicosForm();
    }

    createDatosBasicosForm()
    {
        return this.formBuilder.group({
            nombre          : [this.agente.nombre],
            apellido        : [this.agente.apellido],
            documento       : [this.agente.documento],
            cuil            : [this.agente.documento],
            fechaNacimiento : [this.agente.fechaNacimiento],
            sexo            : [this.agente.sexo],
            genero          : [this.agente.genero],
            estadoCivil     : [this.agente.estadoCivil]
        });
    }

}
