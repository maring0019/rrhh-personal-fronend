import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';
import { ObjectService } from 'src/app/services/tm/object.service';

import { AgenteService } from 'src/app/services/agente.service';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
    selector: 'app-agente-multiple-selection-list',
    templateUrl: 'agente-multiple-selection-list.html',
})
export class AgenteMultipleSelectionListComponent extends ABMListComponent {

    public agentesSeleccionados = []
    // print
    public printing: Boolean = false;
    public reportName: string = "agentes_credencial";

    // list-head options
    public columnDef =
    [
        {
            id: 'foto',
            title: 'Foto',
            size: '20'
        },
        {
            id: 'dni-legajo',
            title: 'DNI/Legajo',
            size: '20'
        },
        {
            id: 'nombre-completo',
            title: 'Nombre Completo',
            size: '30'
        }
    ]

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private agenteService: AgenteService,
        private reportesService: ReportesService,) {
            super(router, objectService);
         }

    protected get dataService(){
        return this.agenteService;
    }

    public ngOnInit() {
        // Evitamos la busqueda por defecto de la superclase
    }

    search(searchParams){
        if (searchParams && Object.keys(searchParams).length ){
            // Si se ingresaron parametros de busqueda, realizamos una busqueda standard
            super.search(searchParams)
        }
        else {
            // Sino borramos cualquier resultado previo
            this.searchStart(searchParams);
            this.searchEnd([]);
        }
    }

    public onItemSelectionChanged(item){
        this.agentesSeleccionados.push(item);
        this.items = this.remoteItemFromList(this.items, item);
    }

    public onPrintableItemRemove(item){
        this.agentesSeleccionados = this.remoteItemFromList(this.agentesSeleccionados, item);
    }
    
    private remoteItemFromList(list, item){
        return list.filter(elem => elem._id != item._id)
    }

    public printCredenciales(){
        
        this.reportesService
            .download(this.reportName, { _ids: this.agentesSeleccionados.map(i=>i._id) })
            .subscribe(
                (data) => {
                    this.reportesService.descargarArchivo(data);
                    this.printing = false;
                },
                (error) => {
                    this.printing = false;
                    console.log(
                        "download error:",
                        JSON.stringify(error)
                    );
                }
            );
    }

}