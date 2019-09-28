import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CrudCreateFormComponent } from 'src/app/modules/tm/components/crud/create-update/form/crud-create-form.component';
import { ArticuloService } from 'src/app/services/articulo.service';


@Component({
    selector: 'app-articulo-create-form',
    templateUrl: './articulo-form.html'
  })

export class ArticuloCreateFormComponent extends CrudCreateFormComponent implements OnInit {
    
    public titulo = 'Articulo'
    public subtitulo = 'Alta'

    constructor(
        public formBuilder: FormBuilder,
        public objectService: ArticuloService,
    ){
        super(formBuilder, objectService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    initForm()
        {
            return this.formBuilder.group({
                codigo                : [],
                nombre                : [],
                descripcion           : [],
                diasCorridos          : [],
                diasHabiles           : [],          
                descuentaDiasLicencia : []
                // formulas: [FormulaSchema]
                // grupo: [],                        // TODO Consultar este dato
                // limitado: [],                     // TODO consultar este dato
                // requiereInformacionAdicional: [], // TODO consultar este dato
                // tituloInformacionAdicional: [],
                // codigoOTI: [],
            });
        }
}