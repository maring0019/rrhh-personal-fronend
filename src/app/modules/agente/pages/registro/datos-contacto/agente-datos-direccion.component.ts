import { Component, OnInit, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Agente } from 'src/app/models/Agente';
import { Direccion } from 'src/app/models/Direccion';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { IProvincia } from 'src/app/models/IProvincia';
import { LocalidadService } from 'src/app/services/localidad.service';
import { ILocalidad } from 'src/app/models/ILocalidad';

@Component({
    selector: 'agente-datos-direccion',
    templateUrl: './agente-datos-direccion.html',
    // styleUrls: ['./agente-datos-direccion.scss']
})
export class AgenteDatosDireccionComponent implements OnInit {

    @Input() direccion: Direccion;
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
    }

    createDireccionForm(){
        let direccion = new Direccion(this.direccion);
        
        return this.formBuilder.group({
            valor           : [direccion.valor],
            provincia       : [direccion.ubicacion.provincia],
            localidad       : [direccion.ubicacion.localidad],
            barrio          : [direccion.ubicacion.barrio],
            codigoPostal    : [direccion.codigoPostal],
        });
    }

}
