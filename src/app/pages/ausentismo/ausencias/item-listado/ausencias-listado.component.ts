import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';

import { AusenciaPeriodo } from 'src/app/models/AusenciaPeriodo';


@Component({
    selector: 'app-ausencias-listado',
    templateUrl: './ausencias-listado.html'
})
export class AusenciasListadoComponent {
    private _items: AusenciaPeriodo[];
    private itemSelected: AusenciaPeriodo;

    public listado: AusenciaPeriodo[]; // Contiene un listado plano de items

    /**
     * Listado de items para mostrar. Acepta una lista de items
     *
     * @type {(item[])}
     */
    @Input()
    get items(): AusenciaPeriodo[] {
        return this._items;
    }

    set items(value: AusenciaPeriodo[]) {
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
     * @type {EventEmitter<AusenciaPeriodo>}
     */
    @Output() selected: EventEmitter<AusenciaPeriodo> = new EventEmitter<AusenciaPeriodo>();
    
    /**
     * Evento que se emite cuando el mouse está sobre un item
     * @type {EventEmitter<any>}
     */
    @Output() hover: EventEmitter<AusenciaPeriodo> = new EventEmitter<AusenciaPeriodo>();


    constructor(private router: Router) {}

    public seleccionarItem(item: AusenciaPeriodo) {
        if (this.itemSelected !== item) {
            this.itemSelected = item;
            this.selected.emit(this.itemSelected);
        }
    }

    public hoverItem(item: AusenciaPeriodo) {
        this.hover.emit(item);
    }

    gotoItem(item) {
        if (item.id){
            this.router.navigate(['/items/registro' , { id: item.id }]);
        }
        else{
            this.router.navigate(['/items/registro']);
        }
    }
}

