import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Direccion } from 'src/app/models/Direccion';
import { IProvincia } from 'src/app/models/IProvincia';
import { ILocalidad } from 'src/app/models/ILocalidad';

import { LocalidadService } from 'src/app/services/localidad.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { Ubicacion } from 'src/app/models/Ubicacion';

@Component({
    selector: 'agente-datos-direccion',
    templateUrl: './agente-datos-direccion.html',
    // styleUrls: ['./agente-datos-direccion.scss']
})
export class AgenteDatosDireccionComponent implements OnInit {

    @Input() direccion: Direccion;
    @Output() outputDireccion: EventEmitter<Direccion> = new EventEmitter<Direccion>();
    direccionForm: FormGroup;
    provincias: IProvincia[] = [];
    localidades: ILocalidad[] = [];

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
        // Init localidades
        this.localidadService.get({})
            .subscribe(data => {
                this.localidades = data;
        });

        this.direccionForm = this.createDireccionForm();
        this.direccionForm.valueChanges.subscribe(() => {
            this.outputDireccion.emit(this.direccionForm.value);
        });
    }

    createDireccionForm(){

        const ubicacion = new Ubicacion(this.direccion.ubicacion);
        
        return this.formBuilder.group({
            valor           : [this.direccion.valor],
            provincia       : [ubicacion.provincia],
            localidad       : [ubicacion.localidad],
            barrio          : [ubicacion.barrio],
            codigoPostal    : [this.direccion.codigoPostal],
        });
    }

}
