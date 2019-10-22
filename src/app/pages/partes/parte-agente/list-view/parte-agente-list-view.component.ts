import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ParteService } from 'src/app/services/parte.service';
import { ParteAgente } from 'src/app/models/ParteAgente';

import { switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-parte-agente-list-view',
    templateUrl: './parte-agente-list-view.html',
})

/**
 * Idem ParteAgenteListComponente, excepto que muestra un listado de solo
 * lectura sin posibilidad de realizar nuevas busquedas o filtrados
 */
export class ParteAgenteListViewComponent implements OnInit {
    
    private _objectID:any;
    
    public searching;
    public partesAgentes: ParteAgente[];

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private parteService: ParteService) {}

    
    public ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this._objectID = params.get('id');
            if (this._objectID){
                this.searchPartesAgentes(this._objectID);
            }
        });

        // this.route.paramMap.pipe(
        //     switchMap((params: ParamMap) => {
        //         this._objectID = params.get('id');
        //         if (this._objectID){
        //             return this.searchPartesAgentes(this._objectID);
        //         }
        //     })
        // );

    }

    private searchPartesAgentes(parteID){
        this.searching = true;
        this.parteService.getPartesAgentes(parteID).subscribe(
            objects => {
                this.partesAgentes = objects;
            },
            (err) => {
                this.partesAgentes = [];
            }
        ).add(() => this.searching = false);
    }
}