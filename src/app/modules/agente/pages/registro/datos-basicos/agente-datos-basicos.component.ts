import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PaisService } from 'src/app/services/pais.service';

import { IPais } from 'src/app/models/IPais';
import { Agente } from 'src/app/models/Agente';
import * as enumerados from 'src/app/models/enumerados';
import { getCuilCuit } from 'src/app/utils/cuilGenerator';

@Component({
    selector: 'agente-datos-basicos',
    templateUrl: './agente-datos-basicos.html',
    // styleUrls: ['./agente-datos-basicos.scss']
})
export class AgenteDatosBasicosComponent implements OnInit {

    @Input() agente: Agente;
    @Output() outputAgente: EventEmitter<Agente> = new EventEmitter<Agente>();

    datosBasicosForm: FormGroup;
    // Form select options
    sexos = enumerados.getObjSexos();
    estados = enumerados.getObjEstadoCivil();
    paises: IPais[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private paisService: PaisService,
        ){}
    
    ngOnInit() {
        // Init paises
        this.paisService.get({})
            .subscribe(data => {
                this.paises = data;
        });

        this.datosBasicosForm = this.createDatosBasicosForm();
        this.datosBasicosForm.valueChanges.subscribe(() => {
            this.outputAgente.emit(this.datosBasicosForm.value);
        });
    }

    createDatosBasicosForm()
    {
        return this.formBuilder.group({
            nombre          : [this.agente.nombre],
            apellido        : [this.agente.apellido],
            documento       : [this.agente.documento],
            cuil            : [this.agente.cuil],
            fechaNacimiento : [this.agente.fechaNacimiento],
            sexo            : [this.agente.sexo],
            genero          : [this.agente.genero],
            estadoCivil     : [this.agente.estadoCivil],
            nacionalidad    : [this.agente.nacionalidad]
        });
    }

    /**
     * Ante un cambio de valor en el sexo o documento del formulario
     * intentamos actualizar el CUIL del agente
     */
    updateCUIL(){
        let cuil = '';
        let sexo:any = this.datosBasicosForm.value.sexo;
        let documento = this.datosBasicosForm.value.documento;
        if (documento && sexo){
            if (typeof sexo != 'string'){
                sexo = sexo.id;
            }
            try{
                cuil = getCuilCuit(''+documento, sexo);
            }
            catch{}
        }
        this.datosBasicosForm.patchValue({cuil:cuil});
    }

}
