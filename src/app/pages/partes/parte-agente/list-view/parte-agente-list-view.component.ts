import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Plex } from '@andes/plex';

import { ParteService } from 'src/app/services/parte.service';
import { ModalService } from 'src/app/services/modal.service';

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
 * en la url, y no de los filtros de busqueda como el otro componente.
 */
export class ParteAgenteListViewComponent implements OnInit {
    
    private _objectID:any;

    public searching;
    public parte: Parte;
    public items: ParteAgente[];
    public objetoSeleccionado: any;
    
    // list-head options
    public columnDef =
        [
            {
                id: 'agente',
                title: 'Agente',
                size: '15'
            },
            {
                id: 'entrada',
                title: 'Entrada',
                size: '12'
            }
            ,
            {
                id: 'salida',
                title: 'Salida',
                size: '12'
            },
            {
                id: 'horas',
                title: 'Hs. Trabajo',
                size: '11'
            },
            {
                id: 'articulo',
                title: 'Artículo',
                size: '10'
            },
            {
                id: 'justificacion',
                title: 'Justificación',
                size: '15'
            },
            {
                id: 'observaciones',
                title: 'Obs.',
                size: '15'
            }
        ]
    

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private parteService: ParteService,
        private location: Location,
        private modalService: ModalService,
        public plex: Plex) {}

    
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

    public procesarParte(obj){
        this.parteService.procesar(obj)
            .subscribe(data=>{
                this.plex.info('info', 'Parte procesado correctamente')
                    .then( e => {
                        this.onCancel();
                });
            },
            err=>{})
    }

    private searchParteDiario(){
        this.searching = true;
        this.parteService.getByID(this._objectID).subscribe(
            object => {
                this.parte = object;
            },
            (err) => {
                this.items = [];
            }
        ).add(() => this.searching = false);
    }

    private searchPartesAgentes(){
        this.searching = true;
        this.parteService.getPartesAgentes(this._objectID).subscribe(
            objects => {
                this.items = objects;
            },
            (err) => {
                this.items = [];
            }
        ).add(() => this.searching = false);
    }

    public canAddAusentismo(obj){
        // Fix this. Revisar validez de las condiciones
        return (!obj.ausencia && obj.justificacion && obj.justificacion.nombre == "Ausente con aviso")
    }

    public hasInconsistencias(obj){
        // Fix this. Revisar validez de las condiciones
        if (!obj.fichadas && !obj.ausencia && obj.justificacion && obj.justificacion.nombre != "Sin novedad") return true;
        if (!obj.fichadas && obj.ausencia && obj.justificacion && obj.justificacion.nombre == "Inasistencia justificada") return true;
        if (obj.fichadas && (!obj.fichadas.entrada || !obj.fichadas.salida) &&
            obj.justificacion && (obj.justificacion.nombre == "Presente" || obj.justificacion.nombre == "Cumplió jornada laboral")
            ) return true
        return false;
    }

    public accionToDo(obj, index){
        this.objetoSeleccionado = obj;
        this.modalService.open('modal-carga-articulo');
    }

    public onCloseModal(){
        this.modalService.close('modal-carga-articulo');
    }

    public onSuccessCargaAusencia(data){
        this.plex.info('info', 'Ausentismo ingresado correctamente')
            .then( e => {
                this.searchPartesAgentes(); // Refresh 
                this.onCloseModal();
        });
    }

    public onErrorsCargaAusencia(error){
        if(error){
            this.plex.info('info', error);
        }
        else{
            this.plex.info('info', 'Debe completar todos los datos obligatorios');
        }
    }

    public onWarningsCargaAusencia(warnings){
        if (warnings && warnings.length){
            let textWarning = ``;
            for (const warn of warnings){
                textWarning = `${textWarning}<p> ${warn} </p>`
            }
            this.plex.info('info', `<p>El articulo seleccionado presenta los
                                    siguientes problemas: ${textWarning} </p>`) ;
        }
    }

}