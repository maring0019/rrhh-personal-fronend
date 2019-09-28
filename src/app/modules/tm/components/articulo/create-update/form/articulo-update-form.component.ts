import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { CrudUpdateFormComponent } from 'src/app/modules/tm/components/crud/create-update/form/crud-update-form.component';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
    selector: 'app-articulo-update-form',
    templateUrl: './articulo-form.html'
  })

export class ArticuloUpdateFormComponent extends CrudUpdateFormComponent implements OnInit {
    
    public titulo = 'Articulo'
    public subtitulo = 'Editar'

    constructor(
        public formBuilder: FormBuilder,
        public objectService: ArticuloService,
        public route: ActivatedRoute
    ){
        super(formBuilder, objectService, route);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    initForm(){
        return this.formBuilder.group({
            id                    : [this.object.id],
            codigo                : [this.object.codigo],
            nombre                : [this.object.nombre],
            descripcion           : [this.object.descripcion],
            diasCorridos          : [this.object.diasCorridos],
            diasHabiles           : [this.object.diasHabiles],          
            descuentaDiasLicencia : [this.object.descuentaDiasLicencia]
        });
    }

}