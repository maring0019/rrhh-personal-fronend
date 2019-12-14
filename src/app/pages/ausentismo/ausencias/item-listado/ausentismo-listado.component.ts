import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Ausentismo as Item } from 'src/app/models/Ausentismo';
import { CalendarStoreService } from 'src/app/stores/calendar.store.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'app-ausentismo-listado',
    templateUrl: './ausentismo-listado.html'
})
export class AusentismoListadoComponent {
    private _items: Item[];
    public itemSelected: Item;

    public listado: Item[]; // Contiene un listado plano de items

    /**
     * Listado de items para mostrar. Acepta una lista de items
     *
     * @type {(item[])}
     */
    @Input()
    get items(): Item[] {
        return this._items;
    }

    set items(value: Item[]) {
        console.log(value);
        this._items = value;
        if (value && value.length) {
            this.listado = value;
        } else {
            this.listado = [];
        }
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
    
    /**
     * Evento que se emite cuando el mouse está sobre un item
     * @type {EventEmitter<any>}
     */
    @Output() hover: EventEmitter<Item> = new EventEmitter<Item>();

    storeSubscription: Subscription;
    
    constructor(private calendarStoreService: CalendarStoreService) {
        this.storeSubscription = this.calendarStoreService.ausentismoSelected$
            .subscribe( ausentismo => {
                this.itemSelected = ausentismo;
                console.log('Item Seleccionado')
                console.log(this.itemSelected)
                this.selected.emit(this.itemSelected);
                // if (rangeSelection) {
                //     this.updateSelectedMonthView(rangeSelection.fechaDesde);
                // }
                // this._rangeSelection = rangeSelection;
                // this.marcarPeriodoSeleccionado();
            });
    }

    public seleccionarItem(item: Item) {
        this.calendarStoreService.ausentismoSelected = item;
        // this.itemSelected = item;
        // this.selected.emit(this.itemSelected);
    }

    public hoverItem(item: Item) {
        this.hover.emit(item);
    }

    public editItem(item: Item){
        this.edit.emit(item);
    }

}

