import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { CrudUpdateFormComponent } from 'src/app/modules/tm/components/crud/create-update/form/crud-update-form.component';
import { ArticuloService } from 'src/app/services/articulo.service';
import { Articulo } from 'src/app/models/Articulo';

@Component({
    selector: 'app-articulo-update-form',
    templateUrl: './articulo-form.html'
  })

export class ArticuloUpdateFormComponent extends CrudUpdateFormComponent implements OnInit {
    
    public titulo = 'Articulo'
    public subtitulo = 'Editar'

    constructor(
        public formBuilder: FormBuilder,
        public route: ActivatedRoute,
        public objectService: ArticuloService,
    ){
        super(formBuilder, route);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    initForm(){
        return this.formBuilder.group({
            _id                   : [this.object._id],
            codigo                : [this.object.codigo],
            nombre                : [this.object.nombre],
            descripcion           : [this.object.descripcion],
            diasCorridos          : [this.object.diasCorridos],
            diasHabiles           : [this.object.diasHabiles],          
            descuentaDiasLicencia : [this.object.descuentaDiasLicencia]
        });
    }

    getDataToUpdate(objID):Observable<Articulo>{
        return this.objectService.getByID(objID);
    }

    guardar(object):Observable<Articulo>{
        return this.objectService.put(object);
    }

}