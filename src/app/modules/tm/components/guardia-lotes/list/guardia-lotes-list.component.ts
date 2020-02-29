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

    public canCreateObject: boolean = true;

    public items:any[] = [];           // Contenedor de objetos visibles para el listado
    public itemSelected: any;          // Objeto seleccionado del listado
    private hiddenItems:any[];       // Contenedor de todos los objetos consultados
    

    // Variable de control para el proceso de busqueda  
    public searching = false;      
    public searched = false;
    public showMore: Boolean = false;

    // list-head options
    public columnDef =
    [
        { 
            id: 'numero',
            name: 'Numero',
            size: '100'
        }
    ]

    constructor(
        private router: Router,
        private plex: Plex,
        private objectService: GuardiaLoteService) { }

    public ngOnInit() {
        this.search({}); // Busqueda inicial sin parametros/filtros
    }
    
    search(searchParams){
        this.searchStart();
        this.objectService.get(searchParams).subscribe(
            objects => {
                this.searchEnd(objects);
            },
            (err) => {
                this.searchEnd([]);
            }
        );
    }

    /**
     * Al inicializar una busqueda se preparan las variables que 
     * alojaran los resultados y se actualizan las variables de
     * control que proveen feedback al usuario sobre lo que esta
     * ocurriendo.
     */
    private searchStart(){
        this.searching = true;
        this.items = []
        this.hiddenItems = [];
        this.showMore = false;
        this.itemSelected = null;
    }

     /**
     * Al finalizar una busqueda se actualizan las variables de control
     * que proveen feedback al usuario indicando esta situacion y luego
     * se delega al metodo showMoreResultados() la responsabilidad de
     * mostrar los items y el boton de 'paginado'.
     * @param items 
     */
    private searchEnd(items:any){
        this.searching = false;
        this.searched = true; 
        this.hiddenItems = items ;
        this.itemSelected = null;
        this.showMoreResultados();   
    }

    
    public showMoreResultados(e?:any){
        if (this.hiddenItems.length > 30){
            this.showMore = true;
            this.items = this.items.concat(this.hiddenItems.slice(0,29));
            this.hiddenItems = this.hiddenItems.slice(30);
        }
        else{
            this.showMore = false;
            this.items = this.items.concat(this.hiddenItems);
            this.hiddenItems = [];
        }   
    }


    // ITEMS ACTIONS DEL LISTADO

    public onItemHover(obj:any){

    }

    public onItemSelectionChanged(obj:any){
        this.itemSelected = obj;
    }

    public onItemDelete(item:any){
        this.objectService.delete(item._id)
            .subscribe(
                data => {
                    this.items = this.items.filter(x => x._id != item._id);
                },
                error => {}
            )
    }

    public onItemEdit(obj:any){
        this.itemSelected = obj;
        this.router.navigate([this.router.url+'/editar/'+obj._id]);
    }

    public onItemAction(actionEvent:IActionEvent){

    }


    // GLOBAL HEADER ACTIONS
   
    public createItem(){
        this.router.navigate([this.router.url+'/crear']);
    }

    public cancel(){
        this.router.navigate(['/configuracion']);
    }

}