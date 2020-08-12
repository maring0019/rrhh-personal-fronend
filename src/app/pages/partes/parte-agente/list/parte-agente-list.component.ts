import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';

import { ObjectService } from 'src/app/services/tm/object.service';
import { ParteService } from 'src/app/services/parte.service';
import { Parte } from 'src/app/models/Parte';
import { ParteAgente } from 'src/app/models/ParteAgente';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { ParteJustificacionService } from 'src/app/services/parte-justificacion.service';


@Component({
    selector: 'app-parte-agente-list',
    templateUrl: './parte-agente-list.html',
})
export class ParteAgenteListComponent extends ABMListComponent {

    @Input() editionEnabled = false;

    public saveButtonEnabled = false;
    public estadoPresentacionConfirmada;

    public parteToUpdate:Parte;
    public partesAgentes:ParteAgente[] = [];

    public justificaciones = []; // Opciones para el select de cada parte

    public modelName = 'parte-agente';

    // list-head options
    public columnDef =
    [
        {
            id: 'agente',
            title: 'Agente',
            size: '16'
        },
        {
            id: 'entrada',
            title: 'Entrada',
            size: '13'
        }
        ,
        {
            id: 'salida',
            title: 'Salida',
            size: '13'
        },
        {
            id: 'horas',
            title: 'Hs. Trabajo',
            size: '13'
        },
        {
            id: 'articulo',
            title: 'Artículo',
            size: '10'
        },
        {
            id: 'justificacion',
            title: 'Justificación',
            size: '20'
        },
        {
            id: 'observaciones',
            title: 'Obs.',
            size: '10'
        }
    ]

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private parteService: ParteService,
        private ubicacionService: UbicacionService,
        private parteJustificacionService: ParteJustificacionService,
        public plex: Plex) {
            super(router, objectService);
         }

    protected get dataService(){
        return this.parteService;
    }

    public ngOnInit() {    
        this.parteJustificacionService.get({})
            .subscribe(data => {
                this.justificaciones = data
            })
    }

    search(searchParams){
        this.searchStart(searchParams);
        this.objectService.get(this.dataService, {...searchParams,...this.sortParams})
        .subscribe(
            objects => {
                return (objects && objects.length)? this.searchPartesAgentes(objects[0]):this.createPartes(searchParams);
            },
            (err) => {
                this.searchPartesAgentes(null);
            }
        );
    }

    searchPartesAgentes(parte:Parte){
        this.refreshParte(parte);
        if (parte && parte._id){
            this.parteService.getPartesAgentes(parte._id).subscribe(
                objects => {
                    this.partesAgentes = objects;
                    this.searchEnd(objects);
                },
                (err) => {
                    this.searchEnd([]);
                }
            );
        }
        else {
            this.searchEnd([]);
        }
        
    }

    createPartes(params){
        if (!params['fecha'] || !params['ubicacion.codigo']) return this.searchPartesAgentes(null);
        
        this.ubicacionService.getByCodigo(params['ubicacion.codigo'])
        .subscribe( ubi => {
            if (ubi){
                const ubicacion = { codigo: ubi.codigo, nombre: ubi.nombre }
                let parte = new Parte({ fecha: params.fecha, ubicacion: ubicacion });
                this.parteService.post(parte).subscribe(
                    object => this.searchPartesAgentes(object) 
                    ,(err) => {
                        this.searchPartesAgentes(null);
                    }
                );
            }
        }),
        (err) => {
            this.searchPartesAgentes(null);
        }            
    }

    public refreshParte(parte:Parte){
        this.parteToUpdate = parte;
        if (parte && parte.estado && parte.estado.nombre == "Presentación total") {
            this.estadoPresentacionConfirmada = true;
            this.enableEdition(false);
        }
        else {
            this.estadoPresentacionConfirmada = false;
            this.enableEdition(true);
        }
    }

    public onEnableEdition(){
        this.enableEdition(true);
    }


    /**
     * Guardado 'temporal' sin confirmacion definitiva de todos los partes
     * de agentes editados en el listado de partes. El estado del parte queda
     * como Presentacion Parcial.
     * El usuario puede continuar realizando cambios hasta confirmar el parte
     * pero los cambios no son notificados para su aprobacion/auditoria.
     */
    public onSavePartes(){
        this.parteService.guardar(this.parteToUpdate, this.items)
            .subscribe(data => {
                // TODO Mejorar el manejo de errores
                this.plex.info('info', `Parte actualizado correctamente. El parte
                    se encuentra aún es estado de 'Presentación Parcial'`)
                    .then( e => {
                        this.refreshParte(data);
                });
        })
    }


    /**
     * Guardado con confirmacion definitiva de todos los partes de agentes
     * editados en el listado de partes. El estado del parte queda como 
     * Presentacion Total. 
     * El usuario puede continuar realizando cambios sobre el parte pero 
     * debe editarlo en forma explicita y cada cambio es notificado para
     * su aprobacion o auditoria
     */
    public onConfirmarPartes(){
        this.parteService.confirmar(this.parteToUpdate, this.items)
            .subscribe(data => {
                // TODO Mejorar el manejo de errores
                this.plex.info('info', `Parte actualizado y confirmado correctamente.
                    El parte se encuentra ahora en estado de 'Presentación Total'`)
                    .then( e => {
                        this.refreshParte(data);
                });
        })
    }

    /**
     * Guardado de un parte en edicion, que ya habia sido confirmado
     * previamente. El estado del parte continua como Presentacion Total. 
     * Se debe notificar a los responsables que corresponda de estos
     * cambios (responsabilidad del endpoint confirmar)
     */
    public onSaveEdition(){
        this.parteService.confirmar(this.parteToUpdate, this.items)
        .subscribe(data => {
            // TODO Mejorar el manejo de errores
            // TODO Terminar de definir a quienes se notifica y que se notifica
            this.plex.info('info', `Parte editado correctamente. Se ha notificado
                a los responsables de esta actualización.`)
                .then( e => {
                    this.refreshParte(data);
            });
        })
    }

    public onCancelEdition(){
        this.onCancel();
    }

    public onCancel(){
        this.router.navigate(['/partes']);
    }

    /**
     * Oculta/muestra los botones de guardar y cancelar al editar un parte.
     * Ademas habilita o no la edicion 'inline' en el listado de partes de
     * los agentes (puntualmente la carga/edicion de la justificacion de cada
     * parte y sus observaciones).
     * @param enable indica si se habiita o no la edicion
     */
    private enableEdition(enable:boolean){
        this.editionEnabled = enable;
    }
}