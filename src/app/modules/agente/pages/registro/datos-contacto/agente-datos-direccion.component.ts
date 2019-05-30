import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LocalidadService } from 'src/app/services/localidad.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

import { Direccion } from 'src/app/models/Direccion';
import { Localidad } from 'src/app/models/Localidad';
import { Provincia } from 'src/app/models/Provincia';

@Component({
    selector: 'agente-datos-direccion',
    templateUrl: './agente-datos-direccion.html',
    // styleUrls: ['./agente-datos-direccion.scss']
})
export class AgenteDatosDireccionComponent implements OnInit {

    @Input() direccion: Direccion;
    @Output() outputDireccion: EventEmitter<Direccion> = new EventEmitter<Direccion>();
    direccionForm: FormGroup;
    provincias: Provincia[] = [];
    localidades: Localidad[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private provinciaService: ProvinciaService,
        private localidadService: LocalidadService){}
    
    ngOnInit() {
         // Init provincias
        this.provinciaService.get({})
            .subscribe(data => {
                this.provincias = data;
        });

        this.direccionForm = this.createDireccionForm();
        this.direccionForm.valueChanges.subscribe(() => {
            this.outputDireccion.emit(this.direccionForm.value);
        });
    }

    createDireccionForm(){
        const provincia = this.direccion.localidad? this.direccion.localidad.provincia:null;
        // Init localidades options
        this.filterLocalidadesOptions(provincia);
        return this.formBuilder.group({
            valor           : [this.direccion.valor],
            provincia       : [provincia],
            localidad       : [this.direccion.localidad],
            barrio          : [this.direccion.barrio],
            codigoPostal    : [this.direccion.codigoPostal],
            calleIzquierda  : [this.direccion.calleIzquierda],
            calleDerecha    : [this.direccion.calleDerecha],
            calleParalela   : [this.direccion.calleParalela],
            complementarios : [this.direccion.complementarios]
        });
    }

    onChangeProvincia(event){
        if (event){
            this.filterLocalidadesOptions(event.value);
        }
        this.direccionForm.patchValue({localidad:null})
    }

    filterLocalidadesOptions(provincia){
        if (!provincia){
            this.localidades = [];
        }
        else{
            this.localidadService.get({provincia:provincia.id})
                .subscribe(data => {
                    this.localidades = data;
            });
        }
    }

}
