import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

import { ABMListComponent } from 'src/app/modules/tm/components/crud/abm-list.component';

import { ObjectService } from 'src/app/services/tm/object.service';
import { ParteService } from 'src/app/services/parte.service';


@Component({
    selector: 'app-parte-list',
    templateUrl: 'parte-list.html',
})
export class ParteListComponent extends ABMListComponent {

    public modelName = 'parte';

    // list-head options
    public columnDef =
    [
        {
            id: 'dia',
            title: 'Día',
            size: '10',
            sort: 'desc'
        },
        {
            id: 'fecha-parte',
            title: 'Fecha',
            size: '10'
        }
        ,
        {
            id: 'servicio',
            title: 'Servicio',
            size: '30'
        },
        {
            id: 'fecha-envio',
            title: 'Envío',
            size: '10'
        },
        {
            id: 'estado',
            title: 'Estado',
            size: '10'
        },
        {
            id: 'novedades',
            title: 'Novedades',
            size: '10'
        },
        {
            id: 'procesado',
            title: 'Procesado',
            size: '10'
        },
        {
            id: 'editado',
            title: 'Editado',
            size: '10'
        }
    ]

    constructor(
        protected router: Router,
        protected objectService: ObjectService,
        private parteService: ParteService,
        public plex: Plex) {
            super(router, objectService);
         }

    protected get dataService(){
        return this.parteService;
    }

    public ngOnInit() {
        // Prevent initial search
    }

    public onItemView(obj:any){
        if (obj._id){
            this.router.navigate(['/partes/recibidos', obj._id, 'agentes']);
        }
        else{
            this.router.navigate(['/objetos/registro']);
        }
    }

    public procesarParte(obj){
        this.parteService.procesar(obj)
            .subscribe(data=>{
                this.plex.info('info', 'Parte procesado correctamente')
                    .then( e => {
                });
            })
    }

    public cancel(){
        this.router.navigate(['/partes']);
    }

}