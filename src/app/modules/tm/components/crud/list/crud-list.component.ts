import { OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { IActionEvent } from 'src/app/models/IActionEvent';


export abstract class CRUDListComponent implements OnInit {

    public searchFormComponent:any;
    public itemListComponent:any;
    public titulo: string; // Encabezado de la pagina
    
    public canCreateObject: boolean = true;


    @ViewChild('searchForm', { read: ViewContainerRef }) searchFormViewContainerRef: ViewContainerRef;
    @ViewChild('itemList', { read: ViewContainerRef }) itemListViewContainerRef: ViewContainerRef;

    protected itemListComponentRef:any
    protected searchFormComponentRef:any

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
        this.searchFormComponentRef = this.searchFormViewContainerRef.createComponent(factory);
        // Subscribe to child Output() events
        this.searchFormComponentRef.instance.searchStart
            .subscribe(event => {
                this.onSearchStart(event);
            }); 
        this.searchFormComponentRef.instance.searchEnd
            .subscribe(event => {
                this.onSearchEnd(event);
            }); 
        this.searchFormComponentRef.instance.searchClear
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
            .subscribe(obj => {
                this.onItemListSelection(obj);
            }); 
        this.itemListComponentRef.instance.hover
            .subscribe(obj => {
                this.onItemListHover(obj);
            });
        this.itemListComponentRef.instance.delete
            .subscribe(obj => {
                this.onItemListDelete(obj);
            });
        this.itemListComponentRef.instance.accion
            .subscribe((event:IActionEvent) => {
                this.onItemListAction(event);
            });
    }

    /**
     * Override me
     * @param obj 
     */
    public onItemListHover(obj:any){}

    public onItemListSelection(obj:any){
        this.objSelected = obj;
        this.router.navigate([this.router.url+'/editar/'+obj.id]);
    }

    public onItemListDelete(obj:any){
        this.objSelected = obj;
        // this.router.navigate([this.router.url+'/editar/'+obj.id]);
    }


    public onItemListAction(actionEvent:IActionEvent){}

    
    /**
     * Cuando somos notificados que finalizo la busqueda mostramos los
     * resultados obtenidos. Primero se actualizan las variables de 
     * control y finalmente el metodo onShowMoreResultados() es el res-
     * ponsable de mostrar los items y el boton de 'paginado'
     * @param items 
     */
    public onSearchEnd(items:any){
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

    public onCerrar(){
        this.router.navigate(['/inicio']);
    }

}