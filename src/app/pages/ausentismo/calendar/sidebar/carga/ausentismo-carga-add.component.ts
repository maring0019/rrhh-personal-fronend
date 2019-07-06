import { Component, OnInit } from '@angular/core';
import { AusentismoCargaComponent } from './ausentismo-carga.component';

import { FormBuilder } from '@angular/forms';

import { Plex } from '@andes/plex';

import { ArticuloService } from 'src/app/services/articulo.service';
import { AusentismoService } from 'src/app/services/ausentismo.service';
import { Ausentismo } from 'src/app/models/Ausentismo';

@Component({
    selector: 'app-ausentismo-carga-add',
    templateUrl: 'ausentismo-carga.html'
})
export class AusentismoCargaAddComponent extends AusentismoCargaComponent implements OnInit {
    public formTitle:String = 'Carga';

    constructor(formBuilder: FormBuilder, articuloService: ArticuloService,
            ausentismoService: AusentismoService, plex: Plex)
        {
            super(formBuilder, articuloService, ausentismoService, plex);
        }

    public ngOnInit() {
        super.ngOnInit();
    }

    protected saveAusentismo(ausentismo){
        this.ausentismoService.postAusentismo(ausentismo)
            .subscribe(data => {
                this.outputAusencias.emit(data.ausencias);
                this.initAusentismoForm(new Ausentismo());
                this.plex.info('success', 'Se ingresaron correctamente las ausencias');
            });
    }
}