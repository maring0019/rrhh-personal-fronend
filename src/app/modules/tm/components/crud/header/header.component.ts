import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-crud-header',
    templateUrl: './header.html',
    
})
export class CrudHeaderComponent {

    @Input() titulo:any;
    
    @Output() create: EventEmitter<any> = new EventEmitter<any>();
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

    public canCreateObject: boolean = true;

    public onCreate(){
        this.create.emit();
    }

    public onCancel(){
        this.cancel.emit();
    }

}

