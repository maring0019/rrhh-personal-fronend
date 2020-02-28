import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Plex } from '@andes/plex';

@Component({
    selector: 'list-item',
    templateUrl: './list-item.html',
    // styleUrls: ['./item-list.scss'],
})
export class ListItemComponent implements OnInit { 

    // @Input() layout: 'completo' | 'contenido' | 'izquierda' | 'derecha' = 'completo';
    // @Input() striped = false;
    @Input() columnDef: any[];
    @Input() botonera: Boolean = true;    
    @Input() editable: Boolean = true;
    @Input() item: any;
    @Input() itemSelected:any;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() edit: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    constructor(private plex: Plex) { }

    ngOnInit() {
        // this.layout = this.layout ? this.layout : 'completo';
    }

    
    public viewItem(item){
        this.selectionChange.emit(item)
    }

    public selectItem(item){
        this.selectionChange.emit(item);
    }

    public editItem(item){
        this.edit.emit(item)
    }

    public deleteItem(item){
        this.itemSelected = item;
        this.plex.confirm(
            `Se va a eliminar el item seleccionado.
            ¿Desea Continuar?`)
            .then( confirm => {
                if (confirm) this.delete.emit(item);
        });
    }

}
