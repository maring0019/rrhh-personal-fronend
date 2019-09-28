import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-crud-list',
    templateUrl: 'crud-list.html',
})
export abstract class CRUDListComponent implements OnInit {

    public searchFormComponent:any;
    public itemListComponent:any;
    public titulo: string; // Encabezado de la pagina


    @ViewChild('searchForm', { read: ViewContainerRef }) searchFormViewContainerRef: ViewContainerRef;
    @ViewChild('itemList', { read: ViewContainerRef }) itemListViewContainerRef: ViewContainerRef;

    private itemListComponentRef:any

    constructor(
        public router: Router,
        public resolver: ComponentFactoryResolver) {
    }


    public objects:any[];         // Contenedor de objetos para el listado
    private hiddenObjects:any[];  // 
    public objSelected: any;      // Objeto seleccionado del listado
    
    // Variable de control  
    public searching = false;      
    public searched = false;
    public showMore: Boolean = false;
    

    public ngOnInit() {
        this.objects = [];
        this.createSearchFormComponent();
        this.createItemListComponent();
        
    }

    private createSearchFormComponent() {
        const factory = this.resolver.resolveComponentFactory(this.searchFormComponent);
        let componentRef:any = this.searchFormViewContainerRef.createComponent(factory);
        // Subscribe to child Output() events
        componentRef.instance.searchStart
            .subscribe(event => {
                this.onSearchStart(event);
            }); 
        componentRef.instance.searchEnd
            .subscribe(event => {
                this.onSearchEnd(event);
            }); 
        componentRef.instance.searchClear
            .subscribe(event => {
                this.onClearResultados(event);
            }); 
    }

    private createItemListComponent() {
        const factory = this.resolver.resolveComponentFactory(this.itemListComponent);
        this.itemListComponentRef = this.itemListViewContainerRef.createComponent(factory);
        // Pass to child Input() parameters value
        this.itemListComponentRef.instance.objects = this.objects;
        // Subscribe to child Output() events
        this.itemListComponentRef.instance.selected
            .subscribe(event => {
                this.onSelection(event);
            }); 
        this.itemListComponentRef.instance.hover
            .subscribe(event => {
                this.onHover(event);
            });
        this.itemListComponentRef.instance.delete
            .subscribe(event => {
                this.onDelete(event);
            });
    }

    public onHover(obj:any){
        console.log(obj);
    }

    public onSelection(obj:any){
        this.objSelected = obj;
        this.router.navigate([this.router.url+'/editar/'+obj.id]);
    }

    public onDelete(obj:any){
        this.objSelected = obj;
        // this.router.navigate([this.router.url+'/editar/'+obj.id]);
    }

    
    /**
     * Cuando somos notificados que finalizo la busqueda mostramos los
     * resultados obtenidos. Primero se actualizan las variables de 
     * control y finalmente el metodo onShowMoreResultados() es el res-
     * ponsable de mostrar los items y el boton de 'paginado'
     * @param items 
     */
    public onSearchEnd(items:any){
        console.log(items)
        this.searching = false;
        this.searched = true;
        this.hiddenObjects = items ;
        this.objSelected = null;
        this.onShowMoreResultados();   
    }

    
    public onShowMoreResultados(e?:any){
        if (this.hiddenObjects.length > 30){
            this.showMore = true;
            this.objects = this.objects.concat(this.hiddenObjects.slice(0,29));
            this.itemListComponentRef.instance.objects = this.objects;
            this.hiddenObjects = this.hiddenObjects.slice(30);
        }
        else{
            this.showMore = false;
            this.objects = this.objects.concat(this.hiddenObjects);
            this.itemListComponentRef.instance.objects = this.objects;
            this.hiddenObjects = [];
        }   
    }


    /**
     * Cuando somos notificados que comenzo una nueva busqueda limpiamos
     * todas las referencias previas 
     * @param event 
     */
    public onSearchStart(event?:any){
        this.searching = true;
        this.objects = []
        this.hiddenObjects = [];
        this.itemListComponentRef.instance.objects = this.objects;
        this.showMore = false;
        this.objSelected = null;
    }

    public onClearResultados(event:any){
        this.onSearchStart();
        this.searching = false;
        this.searched = false;    
    }

   
    public altaObject(){
        this.router.navigate([this.router.url+'/crear']);
    }

}