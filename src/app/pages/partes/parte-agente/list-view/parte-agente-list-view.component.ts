import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ParteService } from 'src/app/services/parte.service';
import { ParteAgente } from 'src/app/models/ParteAgente';
import { Parte } from 'src/app/models/Parte';


@Component({
    selector: 'app-parte-agente-list-view',
    templateUrl: './parte-agente-list-view.html',
})

/**
 * Idem ParteAgenteListComponent, excepto que muestra un listado de solo
 * lectura sin posibilidad de realizar nuevas busquedas o filtrados. El 
 * parte a mostrar se obtiene a partir del id especificado por parametro
 * en la url
 */
export class ParteAgenteListViewComponent implements OnInit {
    
    private _objectID:any;
    
    public searching;
    public parte: Parte;
    public partesAgentes: ParteAgente[];

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private parteService: ParteService,
        private location: Location) {}

    
    public ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this._objectID = params.get('id');
            if (this._objectID){
                this.searchParteDiario();
                this.searchPartesAgentes();
            }
        });
    }

    public onCancel(){
        this.location.back();
    }

    public onParteChanged(){
        this.searchPartesAgentes();
    }


    private searchParteDiario(){
        this.searching = true;
        this.parteService.getByID(this._objectID).subscribe(
            object => {
                this.parte = object;
            },
            (err) => {
                this.partesAgentes = [];
            }
        ).add(() => this.searching = false);
    }

    private searchPartesAgentes(){
        this.searching = true;
        this.parteService.getPartesAgentes(this._objectID).subscribe(
            objects => {
                this.partesAgentes = objects;
                console.log(this.partesAgentes);
            },
            (err) => {
                this.partesAgentes = [];
            }
        ).add(() => this.searching = false);
    }
}