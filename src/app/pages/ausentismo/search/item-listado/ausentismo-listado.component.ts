import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Ausentismo as Item } from 'src/app/models/Ausentismo';
import { CalendarStoreService } from 'src/app/stores/calendar.store.service';
import { Subscription } from 'rxjs/Subscription';
import { DropdownItem } from '@andes/plex';
import { Auth } from 'src/app/services/auth.service';


@Component({
    selector: 'app-ausentismo-listado',
    templateUrl: './ausentismo-listado.html'
})
export class AusentismoListadoComponent {
    private _items: Item[];
    public itemSelected: any;

    public listado: Item[]; // Contiene un listado plano de items
    public accionesDropdownMenu = [];

    @Input()
    editable: Boolean;

    /**
     * Listado de items para mostrar. Acepta una lista de items
     *
     * @type {(item[])}
     */
    @Input()
    get items(): Item[] {
        return this._items;
    }

    set items(items: Item[]) {
        // Recuperamos los permisos del usuario logueado
        // y actualizamos las acciones extras permitidas
        // que podrá realizar el usuario
        if (items && items.length) {
            Object.keys(this.perms).forEach((perm) => {
                this.auth.check(perm).then((value) => {
                    this.perms[perm] = value;
                });
            });
        }
        this.accionesDropdownMenu = [];
         // Le damos un poco de tiempo a que se evaluen los permisos
         window.setTimeout(() =>
            items.map((a,index) => {
                let acciones:DropdownItem[] = this.prepareDropdownActions(a, index);
                this.accionesDropdownMenu.push(acciones);
            })
        );
        
        this._items = items;
        if (items && items.length) {
            this.listado = items;
        } else {
            this.listado = [];
        }
        this.seleccionarItem();
    }

    /**
    * Indica como se muestra la tabla de resultados
    */
    @Input() type: 'default' | 'sm' = 'default';
    
    /**
     * Evento que se emite cuando se selecciona un item
     * @type {EventEmitter<Item>}
     */
    @Output() selected: EventEmitter<Item> = new EventEmitter<Item>();
    @Output() edit: EventEmitter<Item> = new EventEmitter<Item>();
    @Output() delete: EventEmitter<Item> = new EventEmitter<Item>();
    @Output() print: EventEmitter<Item> = new EventEmitter<Item>();
    
    /**
     * Evento que se emite cuando el mouse está sobre un item
     * @type {EventEmitter<any>}
     */
    @Output() hover: EventEmitter<Item> = new EventEmitter<Item>();

    storeSubscription: Subscription;

    /**
     * Listado de permisos requeridos para cada accion extra.
     * Si el usuario logueado tiene el correspondiente permiso
     * se muestra el item de menu. Los valores se actualizan
     * cuando se instancia este componente.
     */
    public perms = {
        "agentes:ausentismo:delete_ausentismo": false,
    };
    
    constructor(private calendarStoreService: CalendarStoreService, private auth: Auth) {
        this.subscribeAusentismoSelectionChanges();
    }

    /**
     * Subscripcion a cualquier cambio realizado sobre el ausentismo seleccionado.
     * Una vez que hemos sido notificados del cambio guardamos una referencia local
     * para indicar visualmente en el listado esta seleccion.
     * La seleccion del ausentismo puede realizarse en diferentes componentes (por ej.
     * desde el calendario principal), pero todos los componentes actualizan el store
     * para indicar el mismo.
     */
    private subscribeAusentismoSelectionChanges(){
        this.storeSubscription = this.calendarStoreService.ausentismoSelected$
            .subscribe( ausentismo => {
                this.itemSelected = ausentismo;
            });
    }

    
    /**
     * Metodo que se invoca al seleccionar un item/ausentismo del listado.
     * Se deben realizar las siguientes acciones sobre el store:
     *   - Actualizar ausentismo seleccionado
     *   - Actualizar periodo seleccionado utilizando las fechas del ausentismo
     * @param item 
     */
    public seleccionarItem(item?: Item) {
        let dateRangeSelection:any;
        if (item){
            dateRangeSelection = {
                fechaDesde: item.fechaDesde,
                fechaHasta: item.fechaHasta
            }
        }
        else{
            dateRangeSelection = null;
        }
        this.calendarStoreService.selectionRange = dateRangeSelection;
        this.calendarStoreService.ausentismoSelected = item;
    }

    public hoverItem(item: Item) {
        this.hover.emit(item);
    }

    public editItem(item: Item){
        this.edit.emit(item);
    }

    public deleteItem(item: Item){
        this.delete.emit(item);
    }

    private prepareDropdownActions(item, index):DropdownItem[]{
        let acciones: DropdownItem[] = [];
        if (this.perms["agentes:ausentismo:delete_ausentismo"])
                acciones.push(this.bajaDropdownAction(item, index));
        
        acciones.push(this.printDropdownAction(item, index))
        return acciones;
    }

    public bajaDropdownAction(item, index){
        let accion = { 
            label: 'Eliminar',
            icon: 'mdi mdi-trash-can-outline',
            handler: (() => {
                this.delete.emit(item);
            }) }
        return accion;
    }

    public printDropdownAction(item, index){
        let accion = { 
            label: 'Imprimir',
            icon: 'mdi mdi-printer',
            handler: (() => {
                this.print.emit(item);
            }) }
        return accion;
    }
}

