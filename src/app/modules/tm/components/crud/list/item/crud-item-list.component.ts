import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';

import { DropdownItem, Plex } from '@andes/plex';


export interface ActionEvent {
    accion:String;
    objeto:any;
}

@Component({
    selector: 'app-crud-item-list',
    templateUrl: './crud-item-list.html'
})
export abstract class CRUDItemListComponent {
    public routes = ['Ausencias', 'Editar']

    private _objetos: any[];
    private objetoSeleccionado: any;
    private idxObjetoSeleccionado:any;

    public accionesDropdownMenu = [];

    layout = 'derecha';

    /**
     * Listado de objetos para mostrar. Acepta una lista de objetos
     *
     * @type {(any[])}
     */
    @Input()
    get objects(): any[] {
        return this._objetos;
    }

    set objects(objetos: any[]) {
        this.accionesDropdownMenu = [];
        objetos.map((a,index) => {
            let acciones:DropdownItem[] = this.prepareObjectDropdownActions(a, index);
            this.accionesDropdownMenu.push(acciones);
        })
        this._objetos = objetos;
    }

    /**
    * Indica como se muestra la tabla de resultados
    */
    @Input() type: 'default' | 'sm' = 'default';
    
    /**
     * Evento que se emite cuando se selecciona un objeto
     */
    @Output() selected: EventEmitter<any> = new EventEmitter<any>();
    
    /**
     * Evento que se emite cuando el mouse está sobre un objeto
     */
    @Output() hover: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Evento que se emite cuando se quiere eliminar un objeto
     */
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    /**
     * 
     */
    @Output() accion: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();


    constructor(
        public router: Router,
        public plex: Plex) {}

    protected prepareObjectDropdownActions(objeto, index):DropdownItem[]{
        return [];
    }
 

    public seleccionarObjeto(objeto: any, index?) {
        if (this.objetoSeleccionado !== objeto) {
            this.objetoSeleccionado = objeto;
            this.idxObjetoSeleccionado = index;
            this.selected.emit(this.objetoSeleccionado);
        }
    }

    public hoverObjeto(objeto: any) {
        this.hover.emit(objeto);
    }

    public eliminarObjeto(objeto: any) {
        this.delete.emit(objeto);
    }

    public gotoObjecto(objeto) {
        
        if (objeto.id){
            this.router.navigate(['/objetos/registro' , { id: objeto.id }]);
        }
        else{
            this.router.navigate(['/objetos/registro']);
        }
    }
    
}

