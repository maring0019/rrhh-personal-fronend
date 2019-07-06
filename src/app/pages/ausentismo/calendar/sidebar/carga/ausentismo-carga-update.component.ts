import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AusentismoCargaComponent } from './ausentismo-carga.component';

import { FormBuilder } from '@angular/forms';

import { Plex } from '@andes/plex';

import { ArticuloService } from 'src/app/services/articulo.service';
import { AusentismoService } from 'src/app/services/ausentismo.service';
import { Ausentismo } from 'src/app/models/Ausentismo';

@Component({
    selector: 'app-ausentismo-carga-update',
    templateUrl: 'ausentismo-carga.html'
})
export class AusentismoCargaUpdateComponent extends AusentismoCargaComponent implements OnInit, OnChanges {
    public formTitle:String = 'Edición';

    constructor(formBuilder: FormBuilder, articuloService: ArticuloService,
            ausentismoService: AusentismoService, plex: Plex)
        {
            super(formBuilder, articuloService, ausentismoService, plex);
        }

    public ngOnInit() {
        super.ngOnInit();
    }

    public ngOnChanges(changes: SimpleChanges){
        if (changes.ausentismo && !changes.ausentismo.isFirstChange()){
            this.initAusentismoForm(changes.ausentismo.currentValue);
        }
    }

    protected saveAusentismo(ausentismo){
        this.ausentismoService.postAusentismo(ausentismo)
            .subscribe(data => {
                this.outputAusencias.emit(data.ausencias);
                // this.initAusentismoForm();
                this.plex.info('success', 'Se ingresaron correctamente las ausencias');
            });
    }
}