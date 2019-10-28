import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { ParteService } from 'src/app/services/parte.service';
import { ParteAgente } from 'src/app/models/ParteAgente';


@Component({
    selector: 'app-parte-agente-list-view',
    templateUrl: './parte-agente-list-view.html',
})

/**
 * Idem ParteAgenteListComponent, excepto que muestra un listado de solo
 * lectura sin posibilidad de realizar nuevas busquedas o filtrados
 */
export class ParteAgenteListViewComponent implements OnInit {
    
    private _objectID:any;
    
    public searching;
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

   
    // Implementar el encabezado para este listado (Mostrar fecha y ubicacion)
    // Implementar la carga de articulos desde aqui ( Accion del boton mas)
    //  * Llamar al formulario con una fecha determinada si se puede
    //  * Analizar si es posible editar un articulo previamente cargado
    // En partes revisar todo el comportamiento en general:
    //  * Filtros
    //  * Fechas iniciales

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