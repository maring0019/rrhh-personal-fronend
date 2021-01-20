import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-agente-print-list',
    templateUrl: 'agente-print-list.html',
})
export class AgentePrintListComponent{
    @Input() items: any;
    @Output() remove: EventEmitter<any> = new EventEmitter<any>();
    @Output() action: EventEmitter<any> = new EventEmitter<any>();

    public onItemDelete(item){
        this.remove.emit(item);
    }

    public onActionCall(){
        this.action.emit();
    }
}