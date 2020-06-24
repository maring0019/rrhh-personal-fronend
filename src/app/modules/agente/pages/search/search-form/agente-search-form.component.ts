import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';

import { AgenteService } from 'src/app/services/agente.service';
import { TipoSituacionService } from 'src/app/services/tm/situacion.service';
import { Agente } from 'src/app/models/Agente';
import { TipoSituacion } from 'src/app/models/TipoSituacion';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isEmpty } from 'src/app/utils/formUtils';


@Component({
    selector: 'app-agente-search-form',
    templateUrl: 'agente-search-form.html',
    // styleUrls: ['agente-search-form.scss']
})
export class AgenteSearchFormComponent implements OnInit, OnDestroy {
    public searchForm: FormGroup;
    private timeoutHandle: number;
    public textoLibre: string = null;
    public autoFocus = 0;
    public mostrarMasOpciones = false;

    // Advanced search form inputs
    public tiposSituacion: TipoSituacion[];
    public tiposEstados; 

    // Eventos
    @Output() searchStart: EventEmitter<any> = new EventEmitter<any>();
    @Output() searchEnd: EventEmitter<Agente[]> = new EventEmitter<Agente[]>();
    @Output() searchClear: EventEmitter<any> = new EventEmitter<any>();


    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private agenteService: AgenteService,
        private tipoSituacionService: TipoSituacionService) {
    }

    public ngOnInit() {
        this.autoFocus = this.autoFocus + 1;
        this.initFormSelectOptions();
        this.searchForm = this.initSearchForm();
    }

    initFormSelectOptions(){
        // Init Tipos Situacion
        this.tipoSituacionService.get({})
        .subscribe(data => {
            this.tiposSituacion = data;
        });
        // Init Tipos de Estado
        this.tiposEstados =[{id:'activo', nombre:'Activo'}, {id:'baja', nombre:'Baja'}];
    }

    initSearchForm(){
        return this.formBuilder.group({
            textoLibre  : [],
            situacion   : [],
            estado      : [],
        });
    }

    ngOnDestroy(): void {
        clearInterval(this.timeoutHandle);
    }

    private prepareSearchParams(){
        let params:any = {};
        let form = this.searchForm.value;
        let textoLibre = form.textoLibre? form.textoLibre.trim(): "";
        if (textoLibre && textoLibre.length >= 4){
            const exps = textoLibre.split(" ");
            let andFilters = [];
            for (let exp of exps) {
                const orFilters = {"$or":[
                    {"nombre"   :{"$regex": exp, "$options":"i"}},
                    {"apellido" :{"$regex": exp, "$options":"i"}},
                    {"documento":{"$regex": exp, "$options":"i"}},
                    {"numero":{"$regex": exp, "$options":"i"}},
                ]}
                andFilters.push(orFilters);
            }
            params['filter'] = JSON.stringify({"$and" : andFilters})
        }
        if (form.estado){
            if (form.estado.id == 'activo'){
                params['activo'] = true;
            }
            else{
                params['activo!'] = true;
            }
        }
        if (form.situacion){
            params['situacionLaboral.situacion.tipoSituacion.nombre'] = form.situacion.nombre;
        }
        return params;
    }

    /**
     * Busca agentes cada vez que el campo de busqueda cambia su valor
     */
    public buscar($event) {
        // Error en Plex, ejecuta un change cuando el input pierde el
        // foco porque detecta que cambia el valor
        if ($event.type) {
            return;
        }
        this.prepareSearchParams();
        // Cancela la búsqueda anterior
        if (this.timeoutHandle) {
            window.clearTimeout(this.timeoutHandle);
        }
        // Inicia búsqueda
        let searchParams = this.prepareSearchParams();
        if (!isEmpty(searchParams)) {
            this.timeoutHandle = window.setTimeout(() => {
                this.searchStart.emit();
                this.timeoutHandle = null;
                this.agenteService.search(searchParams).subscribe(
                    resultado => {
                        // Parse de cada elemento de la lista en un 
                        // objeto Agente completo. Deberia hacerse en el servicio?
                        let agentes = resultado.map(e => e = new Agente(e));
                        this.searchEnd.emit(agentes);
                    },
                    (err) => {
                        this.searchEnd.emit([])
                    }
                );
            }, 1000);
        } else {
            this.searchClear.emit();
        }
    }

    public altaAgente(){
        this.router.navigate(['/agentes/registro']);
    }
}