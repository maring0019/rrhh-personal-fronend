import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-guardia-lotes-item-list',
    templateUrl: './guardia-lotes-item-list.html'
  })

export class GuardiaLotesItemListComponent {
    @Input() editable:Boolean;
    @Input() item: any;
    @Input() itemSelected:any;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() edit: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();


    public readonly modal_id = 'modal-historia-laboral-view';

    constructor(private modalService: ModalService){}

    public viewItem(item){
        this.selectionChange.emit(item)
        this.modalService.open(this.modal_id);
    }

    public onCancelModal(modalId:string){
        this.modalService.close(modalId);
    }

    public selectItem(item){
        this.selectionChange.emit(item);
    }

    public editItem(item){
        this.edit.emit(item)
    }

    public deleteItem(item){
        this.delete.emit(item);
    }
}