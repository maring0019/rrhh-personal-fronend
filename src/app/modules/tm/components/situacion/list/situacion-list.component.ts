import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plex } from '@andes/plex';

import { IActionEvent } from 'src/app/models/IActionEvent';
import { TipoSituacionService } from 'src/app/services/tm/situacion.service';

@Component({
    selector: 'app-situacion-list',
    templateUrl: 'situacion-list.html',
})
export class SituacionListComponent implements OnInit {

    public titulo = 'Situacion Laboral';
    public canCreateObject: boolean = true;

    public objects:any[] = [];         // Contenedor de objetos visibles para el listado
    public itemSelected: any;          // Objeto seleccionado del listado
    private hiddenObjects:any[];       // Contenedor de todos los objetos consultados
    

    // Variable de control  
    public searching = false;      
    public searched = false;
    public showMore: Boolean = false;

    // list-head options
    public columnDef =
    [
        { 
            id: 'nombre',
            name: 'Nombre',
            size: '50'
        },
        {
            id: 'req_vencimiento',
            name: 'Requiere Vencimiento',
            size: '25'
        },
        {
            id: 'activo',
            name: 'Activo',
            size: '25'
        }
    ]

    constructor(
        private router: Router,
        private plex: Plex,
        private objectService: TipoSituacionService) { }

    public ngOnInit() {
        this.search({});
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
     * Primero se actualizan las variables de control y finalmente
     * el metodo showMoreResultados() es el res ponsable de mostrar
     * los items y el boton de 'paginado'.
     * @param items 
     */
    private searchEnd(items:any){
        this.searching = false;
        this.searched = true; 
        this.hiddenObjects = items ;
        this.itemSelected = null;
        this.showMoreResultados();   
    }

    /**
     *
     */
    private searchStart(){
        this.searching = true;
        this.objects = []
        this.hiddenObjects = [];
        this.showMore = false;
        this.itemSelected = null;
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

    public cancel(){
        this.router.navigate(['/configuracion']);
    }

}