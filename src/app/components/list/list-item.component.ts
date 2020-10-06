import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Plex } from "@andes/plex";

@Component({
    selector: "list-item",
    templateUrl: "./list-item.html",
    // styleUrls: ['./item-list.scss'],
})
export class ListItemComponent implements OnInit {
    @Input() size: "sm" | "" = "";
    @Input() columnDef: any[];
    @Input() botonera: Boolean = true;
    @Input() actions: String[] = []; // ['view', 'edit', 'delete', 'history']
    // @Input() botonView: Boolean = true;
    // @Input() botonDelete: Boolean = true;
    @Input() editable: Boolean = true;
    @Input() item: any;
    @Input() itemSelected: any;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() view: EventEmitter<any> = new EventEmitter<any>();
    @Output() edit: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();
    @Output() history: EventEmitter<any> = new EventEmitter<any>();

    public editEnabled: Boolean = false;
    public viewEnabled: Boolean = false;
    public deleteEnabled: Boolean = false;
    public historyEnabled: Boolean = false;

    constructor(private plex: Plex) {}

    ngOnInit() {
        this.viewEnabled = this.actions.indexOf("view") > -1;
        this.editEnabled = this.actions.indexOf("edit") > -1;
        this.deleteEnabled = this.actions.indexOf("delete") > -1;
        this.historyEnabled = this.actions.indexOf("history") > -1;
    }

    public viewItem(item) {
        this.itemSelected = item;
        this.view.emit(item);
    }

    public selectItem(item) {
        this.selectionChange.emit(item);
    }

    public editItem(item) {
        this.edit.emit(item);
    }

    public historyItem(item) {
        this.itemSelected = item;
        this.history.emit(item);
    }

    public deleteItem(item) {
        this.itemSelected = item;
        this.plex
            .confirm(
                `Se va a eliminar el item seleccionado.
            ¿Desea Continuar?`
            )
            .then((confirm) => {
                if (confirm) this.delete.emit(item);
            });
    }
}
