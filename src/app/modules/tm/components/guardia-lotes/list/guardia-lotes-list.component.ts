import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

import { IActionEvent } from 'src/app/models/IActionEvent';
import { GuardiaLoteService } from 'src/app/services/guardia-lote.service';

@Component({
    selector: 'app-guardia-lotes-list',
    templateUrl: 'guardia-lotes-list.html',
})
export class GuardiaLotesListComponent implements OnInit {

    public titulo = 'Lotes';
    public subtitulo = 'Guardias';
    public canCreateObject: boolean = true;

    public objects:any[] = [];         // Contenedor de objetos visibles para el listado
    public itemSelected: any;          // Objeto seleccionado del listado
    private hiddenObjects:any[];       // Contenedor de todos los objetos consultados
    
    // Variable de control  
    public searching = false;      
    public searched = false;
    public showMore: Boolean = false;

    constructor(
        private router: Router,
        private plex: Plex,
        private objectService: GuardiaLoteService) { }

    public ngOnInit() {}


    public onItemHover(obj:any){}

    public onItemSelectionChanged(obj:any){
        this.itemSelected = obj;
    }

    public onItemDelete(item:any){
        this.itemSelected = item;
        this.plex.confirm(
            `Se va a eliminar el item seleccionado.
            ¿Desea Continuar?`)
            .then( confirm => {
                if (confirm) this.deleteItem(item);
        });
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