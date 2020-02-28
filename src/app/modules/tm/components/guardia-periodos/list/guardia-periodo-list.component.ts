import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

import { IActionEvent } from 'src/app/models/IActionEvent';
import { GuardiaPeriodoService } from 'src/app/services/guardia-periodo.service';

@Component({
    selector: 'app-guardia-periodo-list',
    templateUrl: 'guardia-periodo-list.html',
})
export class GuardiaPeriodoListComponent implements OnInit {

    public titulo = 'Periodos';
    public canCreateObject: boolean = true;

    public objects:any[] = [];         // Contenedor de objetos visibles para el listado
    public itemSelected: any;          // Objeto seleccionado del listado
    private hiddenObjects:any[];       // Contenedor de todos los objetos consultados
    
    // list-head options
    public columnDef =
    [
        { 
            id: 'periodo',
            name: 'Periodo',
            size: '70'
        },
        {
            id: 'nombre',
            name: 'Nombre',
            size: '30'
        }
    ]
    // Variable de control  
    public searching = false;      
    public searched = false;
    public showMore: Boolean = false;

    constructor(
        private router: Router,
        private plex: Plex,
        private objectService: GuardiaPeriodoService) { }

    public ngOnInit() {}


    public onItemHover(obj:any){}

    public onItemSelectionChanged(obj:any){
        this.itemSelected = obj;
    }

    public onItemDelete(item:any){
        this.deleteItem(item);
    }

    public onItemEdit(obj:any){
        this.itemSelected = obj;
        this.router.navigate([this.router.url+'/editar/'+obj._id]);
    }


    public onItemAction(actionEvent:IActionEvent){}


     /**
     * Listening output event
     * Cuando somos notificados que finalizo la busqueda mostramos los
     * resultados obtenidos. Primero se actualizan las variables de 
     * control y finalmente el metodo showMoreResultados() es el res-
     * ponsable de mostrar los items y el boton de 'paginado'
     * @param items 
     */
    public onSearchEnd(items:any){
        this.searching = false;
        this.searched = true;
        
        this.hiddenObjects = items ;
        this.itemSelected = null;
        this.showMoreResultados();   
    }

    /**
     * Listening output event
     * Cuando somos notificados que comenzo una nueva busqueda limpiamos
     * todas las referencias previas 
     * @param event 
     */
    public onSearchStart(event?:any){
        this.searching = true;
        this.objects = []
        this.hiddenObjects = [];
        this.showMore = false;
        this.itemSelected = null;
    }

    /**
     * Listening output event
     * @param event
     */
    public onSearchClear(event:any){
        this.onSearchStart();
        this.searching = false;
        this.searched = false;    
    }


    public showMoreResultados(e?:any){
        if (this.hiddenObjects.length > 30){
            this.showMore = true;
            this.objects = this.objects.concat(this.hiddenObjects.slice(0,29));
            this.hiddenObjects = this.hiddenObjects.slice(30);
        }
        else{
            this.showMore = false;
            this.objects = this.objects.concat(this.hiddenObjects);
            this.hiddenObjects = [];
        }   
    }

   
    public createItem(){
        this.router.navigate([this.router.url+'/crear']);
    }

    public deleteItem(item){
        this.objectService.delete(item._id)
            .subscribe(
                data => {
                    this.objects = this.objects.filter(x => x._id != item._id);
                },
                error => {}
            )
    }

    public onCerrar(){
        this.router.navigate(['/configuracion']);
    }

}