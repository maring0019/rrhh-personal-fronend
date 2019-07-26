import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Plex } from '@andes/plex';

import { AgenteService } from 'src/app/services/agente.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { AusentismoService } from 'src/app/services/ausentismo.service';
import { FilesService } from 'src/app/services/files.service';

import { Articulo } from 'src/app/models/Articulo';
import { Ausentismo } from 'src/app/models/Ausentismo';
import { IAusenciaEvento } from 'src/app/models/IAusenciaEvento';
import { Agente } from 'src/app/models/Agente';

@Component({
    selector: 'app-ausentismo-carga',
    templateUrl: 'ausentismo-carga.html'
})
export class AusentismoCargaComponent implements OnInit {
    public agente: Agente;
    public ausentismo: Ausentismo;
    public ausentismoID: String;
    public agenteID: String;
    public articulos: Articulo[] = [];
    public ausentismoFiles: any = [];
    public ausentismoForm: FormGroup;
    public formTitle:String = '';

    constructor(
        protected router:Router,
        protected route: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected agenteService:AgenteService,
        protected articuloService: ArticuloService,
        protected ausentismoService: AusentismoService,
        protected filesService: FilesService,
        protected plex: Plex){ }

    public ngOnInit() {
        this.initAgente();
        this.initAusentismoAndFiles();
    }

    initAgente(){
        this.route.parent.params.subscribe(
            params =>{
                const agenteID = params['agenteId'];
                if (agenteID){
                    this.agenteService.getByID(agenteID).subscribe((data) => {
                        if (data){
                            this.agente = new Agente(data);
                        }
                    });
                }
            }
        );
    }

    /**
     * Recupera el id del ausentismo si se encuentra presente en la URL.
     * Si esta presente este valor, entonces luego recupera el objeto 
     * correspondiente a traves de la API, y sus archivos adjuntos
     * Obs: El id del ausentismo solo estara disponible en la edicion
     */
    initAusentismoAndFiles(){
        this.route.params.subscribe(
            params =>{
                this.ausentismoID = params['ausentismoId'];
                this.initFormTitle();
                this.initAusentismo();
                this.initAusentismoFiles();
            }
        );
    }

    initAusentismo(){
        if (this.ausentismoID){
            this.ausentismoService.getByID(this.ausentismoID).subscribe((data) => {
                if (data){
                    this.ausentismo = data;
                }
            });
        }
    }

    initAusentismoFiles(){
        if (this.ausentismoID){
            this.filesService.getObjectFiles(this.ausentismoID)
                .subscribe(data => {
                    this.ausentismoFiles = data;
            });
        }
    }

    initFormTitle(){    
        if (this.ausentismoID){
            this.formTitle = 'Edicion';
        }
        else{
            this.formTitle = 'Carga';
        }
    }

    public onSuccess(data){
        console.log('Ausencias cargadas');
        console.log(data);
        this.plex.info('info', 'Ausentismo ingresado correctamente')
            .then( e => {
                
                this.onClose();
        });
    }

    public onErrors(error){
        if(error){
            this.plex.info('info', error);
        }
        else{
            this.plex.info('info', 'Debe completar todos los datos obligatorios');
        }
        
    }

    public onWarnings(warnings){
        console.log('Hay Warnings');
        console.log(warnings);
        const articulo = warnings[0].articulo.nombre;
        let textWarning = ``;
        for (const indicador of warnings){
            textWarning= this.getTextPeriodos(indicador, textWarning);
        }
        this.plex.info('info', `<p>El agente <b>${this.agente.nombre}</b> no
                                dispone de dias para el <b>Articulo ${articulo}</b>
                                en los periodos:${textWarning} </p>`) ;
    }

    getTextPeriodos(indicador, textWarning){
        if (indicador.periodo){
            for (const intervalo of indicador.intervalos){
                const desde = moment(intervalo.desde).format('DD/MM/YYYY');
                const hasta = moment(intervalo.hasta).format('DD/MM/YYYY');
                textWarning = `<p>${textWarning} ${indicador.periodo}: ${desde} - ${hasta} </p>`;
            }
        }
        else{
            textWarning = `<p>${textWarning} Periodo Total</p>`;
        }
        return textWarning;
    }

    public onClose(){
        this.router.navigateByUrl(`/agentes/${this.agente.id}/ausencias/listado`);
    }
}